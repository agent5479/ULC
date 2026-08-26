/**
 * Unlimited Copies Takaka — contact form mailer
 *
 * Deploy:
 * 1. https://script.google.com → New project
 * 2. Paste this file into Code.gs
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web app URL into the site .env as VITE_GAS_WEBAPP_URL
 */

var TO_EMAIL = 'ulc@actrix.co.nz';
var MAX_FILES = 8;
var MAX_TOTAL_BYTES = 7 * 1024 * 1024;

function doGet() {
  return json_({ ok: true, service: 'Unlimited Copies Takaka contact form' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'Empty request body' });
    }

    var data = JSON.parse(e.postData.contents);
    var name = String(data.name || '').trim();
    var email = String(data.email || '').trim();
    var phone = String(data.phone || '').trim();
    var message = String(data.message || '').trim();
    var files = data.files || [];

    if (!name || !email || !message) {
      return json_({ ok: false, error: 'Name, email, and message are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json_({ ok: false, error: 'Invalid email address' });
    }

    if (!Array.isArray(files) || files.length > MAX_FILES) {
      return json_({ ok: false, error: 'Too many attachments' });
    }

    var attachments = [];
    var totalBytes = 0;

    for (var i = 0; i < files.length; i++) {
      var f = files[i] || {};
      var fileName = String(f.name || 'attachment').replace(/[\\\/]+/g, '_');
      var mimeType = String(f.mimeType || 'application/octet-stream');
      var b64 = String(f.data || '');
      if (!b64) continue;

      var bytes = Utilities.base64Decode(b64);
      totalBytes += bytes.length;
      if (totalBytes > MAX_TOTAL_BYTES) {
        return json_({ ok: false, error: 'Attachments exceed size limit' });
      }
      attachments.push(Utilities.newBlob(bytes, mimeType, fileName));
    }

    var subject = 'Website enquiry from ' + name;
    var body =
      'New message from the Unlimited Copies Takaka website\n\n' +
      'Name: ' +
      name +
      '\n' +
      'Email: ' +
      email +
      '\n' +
      'Phone: ' +
      (phone || '(not provided)') +
      '\n' +
      'Sent: ' +
      (data.sentAt || new Date().toISOString()) +
      '\n\n' +
      'Message:\n' +
      message +
      '\n';

    var html =
      '<p><strong>New message from the Unlimited Copies Takaka website</strong></p>' +
      '<p><strong>Name:</strong> ' +
      escapeHtml_(name) +
      '<br>' +
      '<strong>Email:</strong> ' +
      escapeHtml_(email) +
      '<br>' +
      '<strong>Phone:</strong> ' +
      escapeHtml_(phone || '(not provided)') +
      '</p>' +
      '<p>' +
      escapeHtml_(message).replace(/\n/g, '<br>') +
      '</p>';

    GmailApp.sendEmail(TO_EMAIL, subject, body, {
      replyTo: email,
      name: name,
      htmlBody: html,
      attachments: attachments,
    });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function escapeHtml_(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
