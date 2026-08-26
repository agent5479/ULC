/**
 * Unlimited Copies Takaka — contact form mailer
 *
 * IMPORTANT: Create and deploy this project while signed in as
 *   unlimitedcopies07@gmail.com
 * That account is the sending gateway. Mail is delivered to ulc@actrix.co.nz.
 *
 * Deploy:
 * 1. Sign in to https://script.google.com as unlimitedcopies07@gmail.com
 * 2. New project → paste this Code.gs
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me (unlimitedcopies07@gmail.com)
 *    - Who has access: Anyone
 * 4. Copy the /exec URL → GitHub secret VITE_GAS_WEBAPP_URL → redeploy Pages
 */

var TO_EMAIL = 'ulc@actrix.co.nz';
var GATEWAY_EMAIL = 'unlimitedcopies07@gmail.com';
var FROM_NAME = 'Unlimited Copies Takaka';
var MAX_FILES = 8;
var MAX_TOTAL_BYTES = 7 * 1024 * 1024;

function doGet() {
  return json_({
    ok: true,
    service: 'Unlimited Copies Takaka contact form',
    gateway: GATEWAY_EMAIL,
    to: TO_EMAIL,
  });
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
      return json_({ ok: false, error: 'Too many attachments (max ' + MAX_FILES + ')' });
    }

    var attachments = [];
    var totalBytes = 0;
    var fileNames = [];

    for (var i = 0; i < files.length; i++) {
      var f = files[i] || {};
      var fileName = String(f.name || 'attachment').replace(/[\\\/]+/g, '_');
      var mimeType = String(f.mimeType || 'application/octet-stream');
      var b64 = String(f.data || '');
      if (!b64) continue;

      var bytes = Utilities.base64Decode(b64);
      totalBytes += bytes.length;
      if (totalBytes > MAX_TOTAL_BYTES) {
        return json_({ ok: false, error: 'Attachments exceed size limit (~6 MB)' });
      }
      attachments.push(Utilities.newBlob(bytes, mimeType, fileName));
      fileNames.push(fileName);
    }

    var subject = '[Website] Enquiry from ' + name;
    var body =
      'New message from unlimitedcopies.co.nz\n\n' +
      'Name: ' +
      name +
      '\n' +
      'Email: ' +
      email +
      '\n' +
      'Phone: ' +
      (phone || '(not provided)') +
      '\n' +
      'Attachments: ' +
      (fileNames.length ? fileNames.join(', ') : '(none)') +
      '\n' +
      'Sent: ' +
      (data.sentAt || new Date().toISOString()) +
      '\n' +
      'Gateway: ' +
      GATEWAY_EMAIL +
      ' → ' +
      TO_EMAIL +
      '\n\n' +
      'Message:\n' +
      message +
      '\n';

    var html =
      '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a">' +
      '<p style="margin:0 0 12px;padding:10px 12px;background:#c8102e;color:#fff;font-weight:bold">' +
      'Unlimited Copies Takaka — website enquiry</p>' +
      '<p><strong>Name:</strong> ' +
      escapeHtml_(name) +
      '<br>' +
      '<strong>Email:</strong> <a href="mailto:' +
      escapeHtml_(email) +
      '">' +
      escapeHtml_(email) +
      '</a><br>' +
      '<strong>Phone:</strong> ' +
      escapeHtml_(phone || '(not provided)') +
      '<br>' +
      '<strong>Attachments:</strong> ' +
      escapeHtml_(fileNames.length ? fileNames.join(', ') : '(none)') +
      '</p>' +
      '<p style="white-space:pre-wrap;border-left:3px solid #c8102e;padding-left:12px">' +
      escapeHtml_(message).replace(/\n/g, '<br>') +
      '</p>' +
      '<p style="font-size:12px;color:#666">Sent via ' +
      escapeHtml_(GATEWAY_EMAIL) +
      ' · Reply goes to the customer</p>' +
      '</div>';

    GmailApp.sendEmail(TO_EMAIL, subject, body, {
      replyTo: email,
      name: FROM_NAME,
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
