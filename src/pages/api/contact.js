import nodemailer from "nodemailer";
import { saveEnquiry } from "@/lib/dataService";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const {
    name,
    fullName,
    email,
    businessEmail,
    company,
    companyName,
    country,
    destination,
    phone,
    phoneWhatsApp,
    product,
    products,
    quantity,
    volume,
    unit,
    incoterm,
    message,
    fileAttachmentUrl,
    fileAttachmentName,
    honeypot, // Anti-spam hidden honeypot
  } = req.body || {};

  // 1. Anti-spam honeypot check
  if (honeypot && honeypot.trim().length > 0) {
    // Silently succeed to fool spam bots
    return res.status(200).json({
      success: true,
      message: "Enquiry received successfully.",
    });
  }

  // 2. Field validation
  const clientName = (fullName || name || "").trim();
  const clientEmail = (businessEmail || email || "").trim().toLowerCase();
  const clientCompany = (companyName || company || "").trim();
  const clientPhone = (phoneWhatsApp || phone || "").trim();
  const clientCountry = (destination || country || "").trim();

  if (!clientName) {
    return res.status(400).json({ success: false, message: "Full Name is required." });
  }

  if (!clientEmail) {
    return res.status(400).json({ success: false, message: "Business Email is required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(clientEmail)) {
    return res.status(400).json({ success: false, message: "Please provide a valid business email address." });
  }

  if (!clientCompany) {
    return res.status(400).json({ success: false, message: "Company Name is required for B2B export quotations." });
  }

  if (!clientPhone) {
    return res.status(400).json({ success: false, message: "Phone or WhatsApp contact number is required." });
  }

  if (!clientCountry) {
    return res.status(400).json({ success: false, message: "Destination Country or Port is required." });
  }

  // Normalize products selection
  let selectedProducts = [];
  if (Array.isArray(products) && products.length > 0) {
    selectedProducts = products.filter(Boolean);
  } else if (product) {
    selectedProducts = [product];
  } else {
    selectedProducts = ["General Spice Enquiry"];
  }

  const quantityValue = quantity || volume || "";
  const unitValue = unit || "MT";
  const preferredIncoterm = incoterm || "FOB Cochin";
  const userMessage = (message || "").trim();

  // Get client IP address
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(/, /)[0] : req.socket?.remoteAddress || "";

  try {
    // 3. Save into MongoDB / Persistent data store
    const saved = await saveEnquiry({
      name: clientName,
      email: clientEmail,
      company: clientCompany,
      country: clientCountry,
      phone: clientPhone,
      product: selectedProducts.join(", "),
      products: selectedProducts,
      volume: quantityValue ? `${quantityValue} ${unitValue}` : "",
      unit: unitValue,
      incoterm: preferredIncoterm,
      message: userMessage,
      fileAttachmentUrl: fileAttachmentUrl || "",
      fileAttachmentName: fileAttachmentName || "",
      status: "new",
      ip,
    });

    // 4. Optional Server-Side Email Notifications (Company Notification & Buyer Confirmation)
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const companyEmail = process.env.ADMIN_EMAIL || "exports@auronovaexports.com";

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Email 1: Notification to Company Export Desk
        const companyMailOptions = {
          from: `"Auronova Trade Portal" <${process.env.SMTP_FROM || smtpUser}>`,
          to: companyEmail,
          subject: `[New Commercial RFQ] ${clientCompany} — ${selectedProducts.join(", ")}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #24251F; max-width: 600px; margin: 0 auto; border: 1px solid #E8E0D2; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #24251F; padding: 24px; text-align: center; color: #FAF7F0;">
                <h2 style="margin: 0; color: #D6A441;">Auronova Exports — New RFQ Received</h2>
                <p style="margin: 4px 0 0; font-size: 13px; color: #FAF7F0;">Commercial Trade Desk · Cochin Port, Kerala</p>
              </div>
              <div style="padding: 24px; background-color: #FAF7F0;">
                <p style="margin-top: 0;"><strong>Enquiry Reference:</strong> ${saved._id || "N/A"}</p>
                <hr style="border: none; border-top: 1px solid #E8E0D2; margin: 16px 0;" />
                <table style="width: 100%; font-size: 14px; text-align: left;">
                  <tr><td style="padding: 6px 0; width: 140px; color: #666;"><strong>Buyer Name:</strong></td><td>${clientName}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;"><strong>Company:</strong></td><td>${clientCompany}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;"><strong>Business Email:</strong></td><td><a href="mailto:${clientEmail}">${clientEmail}</a></td></tr>
                  <tr><td style="padding: 6px 0; color: #666;"><strong>Phone / WhatsApp:</strong></td><td>${clientPhone}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;"><strong>Destination / Country:</strong></td><td>${clientCountry}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;"><strong>Selected Products:</strong></td><td><strong>${selectedProducts.join(", ")}</strong></td></tr>
                  <tr><td style="padding: 6px 0; color: #666;"><strong>Estimated Quantity:</strong></td><td>${quantityValue} ${unitValue}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;"><strong>Preferred Incoterm:</strong></td><td>${preferredIncoterm}</td></tr>
                  ${fileAttachmentUrl ? `<tr><td style="padding: 6px 0; color: #666;"><strong>Specification File:</strong></td><td><a href="${fileAttachmentUrl}" target="_blank">Download (${fileAttachmentName || "Attachment"})</a></td></tr>` : ""}
                </table>
                <div style="margin-top: 16px; padding: 12px; background-color: #fff; border-radius: 8px; border: 1px solid #E8E0D2;">
                  <strong>Message / Buyer Specifications:</strong>
                  <p style="margin: 8px 0 0; font-size: 13px; white-space: pre-wrap;">${userMessage || "No additional notes provided."}</p>
                </div>
              </div>
            </div>
          `,
        };

        // Email 2: Confirmation Receipt to Buyer
        const buyerMailOptions = {
          from: `"Auronova Exports — Trade Desk" <${process.env.SMTP_FROM || smtpUser}>`,
          to: clientEmail,
          subject: `Quotation Request Acknowledged [Ref: ${saved._id?.slice(-8) || "Export-Desk"}] — Auronova Exports`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #24251F; max-width: 600px; margin: 0 auto; border: 1px solid #E8E0D2; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #24251F; padding: 24px; text-align: center; color: #FAF7F0;">
                <h2 style="margin: 0; color: #D6A441;">Auronova Exports Pvt. Ltd.</h2>
                <p style="margin: 4px 0 0; font-size: 13px; color: #FAF7F0;">Rooted in Kerala. Delivered to the World.</p>
              </div>
              <div style="padding: 24px; background-color: #FAF7F0;">
                <h3 style="margin-top: 0; color: #4A2C20;">Dear ${clientName},</h3>
                <p>Thank you for submitting your commercial quotation inquiry with Auronova Exports.</p>
                <p>We have registered your requirement for <strong>${selectedProducts.join(", ")}</strong> with delivery terms on <strong>${preferredIncoterm}</strong> to <strong>${clientCountry}</strong>.</p>
                <div style="padding: 16px; background-color: #fff; border-radius: 8px; border: 1px solid #E8E0D2; margin: 20px 0;">
                  <p style="margin: 0 0 8px;"><strong>Commercial Trade Desk Review:</strong></p>
                  <p style="margin: 0; font-size: 13px; color: #555;">Our Cochin export desk is currently assessing prevailing harvest auctions, moisture and density grading parameters, and ocean freight calculations. A formal proforma quote will be delivered to your email within <strong>24 business hours</strong>.</p>
                </div>
                <p style="font-size: 13px; color: #666;">If your requirement is urgent or you require immediate air courier sample dispatch, you may reach our export team directly via WhatsApp or reply to this email.</p>
                <p style="margin-bottom: 0; font-size: 13px; color: #24251F;">
                  Warm regards,<br />
                  <strong>International Trade Desk</strong><br />
                  Auronova Exports Pvt. Ltd.<br />
                  Spice Trade Centre, Cochin Port Zone<br />
                  Kochi, Kerala 682 001, India<br />
                  Email: exports@auronovaexports.com
                </p>
              </div>
            </div>
          `,
        };

        // Fire emails without blocking critical response
        Promise.all([
          transporter.sendMail(companyMailOptions),
          transporter.sendMail(buyerMailOptions),
        ]).catch((err) => {
          console.warn("SMTP email dispatch notice (non-fatal):", err.message);
        });
      } catch (mailErr) {
        console.warn("Email transporter notice:", mailErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Commercial export quotation request submitted successfully. Our trade desk will issue a formal proforma quote within 24 business hours.",
      enquiryId: saved._id,
    });
  } catch (error) {
    console.error("Error processing quote enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while processing your quotation request. Please contact exports@auronovaexports.com directly.",
    });
  }
}
