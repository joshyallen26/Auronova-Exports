import fs from "fs";
import path from "path";
import connectDB, { isDbConnected } from "./db";
import Product from "./models/Product";
import Port from "./models/Port";
import WebsiteContent from "./models/WebsiteContent";
import SeoSetting from "./models/SeoSetting";
import IntegrationSetting from "./models/IntegrationSetting";
import Enquiry from "./models/Enquiry";
import Media from "./models/Media";
import { spices } from "@/data/spices";
import { keralaPorts } from "@/data/ports";
import { initialSeoSettings, initialIntegrations, initialWebsiteContent } from "./defaultData";

// Local persistent file fallback path
const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "content-store.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (e) {}
  }
  if (!fs.existsSync(STORE_FILE)) {
    const initialStore = {
      products: spices.map((s, index) => ({
        _id: `prod_${s.slug}`,
        ...s,
        featured: true,
        status: "published",
        sortOrder: index,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
      ports: keralaPorts.map((p, index) => ({
        _id: `port_${p.id}`,
        ...p,
        slug: p.id,
        isPublished: true,
        sortOrder: index,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
      content: initialWebsiteContent.reduce((acc, curr) => {
        acc[curr.sectionKey] = curr;
        return acc;
      }, {}),
      seo: initialSeoSettings.reduce((acc, curr) => {
        acc[curr.pageKey] = curr;
        return acc;
      }, {}),
      integrations: initialIntegrations,
      enquiries: [
        {
          _id: "enq_sample_1",
          name: "Johannes Becker",
          email: "j.becker@hamburgspices.de",
          company: "Hanseatic Spice Imports GmbH",
          country: "Germany",
          phone: "+49 40 12345678",
          product: "Malabar Black Pepper",
          volume: "20ft FCL Container (~14MT)",
          incoterm: "CIF Hamburg",
          message: "Looking for high-density Tellicherry Garbled black peppercorns for our spice packaging line. Please furnish proforma invoice and sample specs.",
          status: "in_progress",
          notes: "Sample dispatch scheduled via DHL courier.",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          _id: "enq_sample_2",
          name: "Claire Fontaine",
          email: "c.fontaine@aromatics-paris.fr",
          company: "Gourmet Aromatiques SARL",
          country: "France",
          phone: "+33 1 42680000",
          product: "Alleppey Green Cardamom",
          volume: "500kg Trial Air Consignment",
          incoterm: "CIF Paris CDG",
          message: "Interested in Alleppey Green Extra Bold (AGEB 8mm+) green cardamom. Please send current price quotation and harvest details.",
          status: "new",
          notes: "",
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        },
      ],
      media: [
        {
          _id: "media_1",
          fileName: "bg-home-hero.jpg",
          originalName: "Raw Kerala Spices Dark Table",
          url: "/images/bg-home-hero.jpg",
          fileSize: 420000,
          mimeType: "image/jpeg",
          altText: "Authentic Kerala raw export spices",
          uploadedAt: new Date().toISOString(),
        },
        {
          _id: "media_2",
          fileName: "red-chilli.jpg",
          originalName: "Sun-dried Indian Red Chillies",
          url: "/images/red-chilli.jpg",
          fileSize: 310000,
          mimeType: "image/jpeg",
          altText: "Sun-dried whole Indian red chillies",
          uploadedAt: new Date().toISOString(),
        },
      ],
    };
    try {
      fs.writeFileSync(STORE_FILE, JSON.stringify(initialStore, null, 2), "utf-8");
    } catch (e) {}
  }
}

function readStore() {
  ensureStore();
  try {
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return {
      products: [],
      ports: [],
      content: {},
      seo: {},
      integrations: initialIntegrations,
      enquiries: [],
      media: [],
    };
  }
}

function writeStore(data) {
  ensureStore();
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing fallback store:", e);
  }
}

// Ensure database has default data seeded
let isSeeded = false;
export async function seedDatabaseIfEmpty() {
  if (isSeeded) return;
  try {
    await connectDB();
    if (!isDbConnected()) return;

    // Check products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const prodsToSeed = spices.map((s, index) => ({
        ...s,
        featured: true,
        status: "published",
        sortOrder: index,
      }));
      await Product.insertMany(prodsToSeed);
    }

    // Check ports
    const portCount = await Port.countDocuments();
    if (portCount === 0) {
      const portsToSeed = keralaPorts.map((p, index) => ({
        ...p,
        slug: p.id,
        isPublished: true,
        sortOrder: index,
      }));
      await Port.insertMany(portsToSeed);
    }

    // Check content
    const contentCount = await WebsiteContent.countDocuments();
    if (contentCount === 0) {
      await WebsiteContent.insertMany(initialWebsiteContent);
    }

    // Check SEO
    const seoCount = await SeoSetting.countDocuments();
    if (seoCount === 0) {
      await SeoSetting.insertMany(initialSeoSettings);
    }

    // Check Integrations
    const integration = await IntegrationSetting.findOne({ key: "general_settings" });
    if (!integration) {
      await IntegrationSetting.create(initialIntegrations);
    }

    isSeeded = true;
  } catch (e) {
    console.warn("Auto-seed notice (will use persistent fallback):", e.message);
  }
}

// PRODUCTS API
export async function getProducts(onlyPublished = false) {
  try {
    await connectDB();
    if (isDbConnected()) {
      await seedDatabaseIfEmpty();
      const filter = onlyPublished ? { status: "published" } : {};
      const prods = await Product.find(filter).sort({ sortOrder: 1, createdAt: -1 }).lean();
      if (prods && prods.length > 0) return prods;
    }
  } catch (e) {}

  const store = readStore();
  let list = store.products || [];
  if (onlyPublished) {
    list = list.filter((p) => p.status === "published");
  }
  return list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

export async function getProductByIdOrSlug(idOrSlug) {
  try {
    await connectDB();
    if (isDbConnected()) {
      const prod = await Product.findOne({
        $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }],
      }).lean();
      if (prod) return prod;
    }
  } catch (e) {}

  const store = readStore();
  return store.products.find((p) => p._id === idOrSlug || p.slug === idOrSlug) || null;
}

export async function saveProduct(productData) {
  let saved = null;
  const slug =
    productData.slug ||
    productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  try {
    await connectDB();
    if (isDbConnected()) {
      if (productData._id && productData._id.match(/^[0-9a-fA-F]{24}$/)) {
        saved = await Product.findByIdAndUpdate(
          productData._id,
          { ...productData, slug },
          { new: true, runValidators: true }
        ).lean();
      } else {
        const { _id, ...createPayload } = productData;
        saved = await Product.findOneAndUpdate(
          { slug },
          { ...createPayload, slug },
          { upsert: true, new: true, runValidators: true }
        ).lean();
      }
    }
  } catch (e) {
    console.warn("DB saveProduct error, falling back to file store:", e.message);
  }

  // Always sync to local store for reliability
  const store = readStore();
  const existingIndex = store.products.findIndex(
    (p) => (productData._id && p._id === productData._id) || p.slug === slug
  );

  const updatedItem = {
    _id: saved?._id?.toString() || productData._id || `prod_${Date.now()}`,
    ...productData,
    slug,
    updatedAt: new Date().toISOString(),
    createdAt: existingIndex >= 0 ? store.products[existingIndex].createdAt : new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    store.products[existingIndex] = updatedItem;
  } else {
    store.products.push(updatedItem);
  }
  writeStore(store);

  return saved || updatedItem;
}

export async function deleteProduct(idOrSlug) {
  try {
    await connectDB();
    if (isDbConnected()) {
      await Product.deleteOne({
        $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }],
      });
    }
  } catch (e) {}

  const store = readStore();
  store.products = store.products.filter((p) => p._id !== idOrSlug && p.slug !== idOrSlug);
  writeStore(store);
  return { success: true };
}

// PORTS API
export async function getPorts(onlyPublished = false) {
  try {
    await connectDB();
    if (isDbConnected()) {
      await seedDatabaseIfEmpty();
      const filter = onlyPublished ? { isPublished: true } : {};
      const ports = await Port.find(filter).sort({ sortOrder: 1, createdAt: 1 }).lean();
      if (ports && ports.length > 0) return ports;
    }
  } catch (e) {}

  const store = readStore();
  let list = store.ports || [];
  if (onlyPublished) {
    list = list.filter((p) => p.isPublished !== false);
  }
  return list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

export async function savePort(portData) {
  let saved = null;
  const slug =
    portData.slug ||
    portData.id ||
    portData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  try {
    await connectDB();
    if (isDbConnected()) {
      if (portData._id && portData._id.match(/^[0-9a-fA-F]{24}$/)) {
        saved = await Port.findByIdAndUpdate(
          portData._id,
          { ...portData, slug },
          { new: true, runValidators: true }
        ).lean();
      } else {
        const { _id, ...createPayload } = portData;
        saved = await Port.findOneAndUpdate(
          { slug },
          { ...createPayload, slug },
          { upsert: true, new: true, runValidators: true }
        ).lean();
      }
    }
  } catch (e) {
    console.warn("DB savePort error:", e.message);
  }

  const store = readStore();
  const existingIndex = store.ports.findIndex(
    (p) => (portData._id && p._id === portData._id) || p.slug === slug || p.id === portData.id
  );

  const updatedItem = {
    _id: saved?._id?.toString() || portData._id || `port_${Date.now()}`,
    ...portData,
    slug,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    store.ports[existingIndex] = updatedItem;
  } else {
    store.ports.push(updatedItem);
  }
  writeStore(store);

  return saved || updatedItem;
}

export async function deletePort(idOrSlug) {
  try {
    await connectDB();
    if (isDbConnected()) {
      await Port.deleteOne({
        $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }],
      });
    }
  } catch (e) {}

  const store = readStore();
  store.ports = store.ports.filter((p) => p._id !== idOrSlug && p.slug !== idOrSlug && p.id !== idOrSlug);
  writeStore(store);
  return { success: true };
}

// WEBSITE CONTENT API
export async function getAllContent() {
  try {
    await connectDB();
    if (isDbConnected()) {
      await seedDatabaseIfEmpty();
      const contentList = await WebsiteContent.find({}).lean();
      if (contentList && contentList.length > 0) {
        return contentList.reduce((acc, curr) => {
          acc[curr.sectionKey] = curr;
          return acc;
        }, {});
      }
    }
  } catch (e) {}

  const store = readStore();
  return store.content || {};
}

export async function getContentBySection(sectionKey) {
  try {
    await connectDB();
    if (isDbConnected()) {
      const doc = await WebsiteContent.findOne({ sectionKey }).lean();
      if (doc) return doc;
    }
  } catch (e) {}

  const store = readStore();
  return store.content?.[sectionKey] || null;
}

export async function saveContent(sectionKey, data) {
  let saved = null;
  try {
    await connectDB();
    if (isDbConnected()) {
      saved = await WebsiteContent.findOneAndUpdate(
        { sectionKey },
        { ...data, sectionKey },
        { upsert: true, new: true, runValidators: true }
      ).lean();
    }
  } catch (e) {}

  const store = readStore();
  if (!store.content) store.content = {};
  store.content[sectionKey] = {
    sectionKey,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  writeStore(store);

  return saved || store.content[sectionKey];
}

// SEO SETTINGS API
export async function getSeoSettings() {
  try {
    await connectDB();
    if (isDbConnected()) {
      await seedDatabaseIfEmpty();
      const docs = await SeoSetting.find({}).lean();
      if (docs && docs.length > 0) return docs;
    }
  } catch (e) {}

  const store = readStore();
  return Object.values(store.seo || {});
}

export async function getSeoSetting(pageKey) {
  try {
    await connectDB();
    if (isDbConnected()) {
      const doc = await SeoSetting.findOne({ pageKey }).lean();
      if (doc) return doc;
    }
  } catch (e) {}

  const store = readStore();
  return store.seo?.[pageKey] || initialSeoSettings.find((s) => s.pageKey === pageKey) || null;
}

export async function saveSeoSetting(pageKey, data) {
  let saved = null;
  try {
    await connectDB();
    if (isDbConnected()) {
      saved = await SeoSetting.findOneAndUpdate(
        { pageKey },
        { ...data, pageKey },
        { upsert: true, new: true, runValidators: true }
      ).lean();
    }
  } catch (e) {}

  const store = readStore();
  if (!store.seo) store.seo = {};
  store.seo[pageKey] = {
    pageKey,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  writeStore(store);

  return saved || store.seo[pageKey];
}

// INTEGRATIONS & GENERAL SETTINGS API
export async function getIntegrationSettings() {
  try {
    await connectDB();
    if (isDbConnected()) {
      await seedDatabaseIfEmpty();
      const doc = await IntegrationSetting.findOne({ key: "general_settings" }).lean();
      if (doc) return doc;
    }
  } catch (e) {}

  const store = readStore();
  return store.integrations || initialIntegrations;
}

export async function saveIntegrationSettings(data) {
  let saved = null;
  try {
    await connectDB();
    if (isDbConnected()) {
      saved = await IntegrationSetting.findOneAndUpdate(
        { key: "general_settings" },
        { ...data, key: "general_settings" },
        { upsert: true, new: true, runValidators: true }
      ).lean();
    }
  } catch (e) {}

  const store = readStore();
  store.integrations = {
    ...initialIntegrations,
    ...(store.integrations || {}),
    ...data,
    updatedAt: new Date().toISOString(),
  };
  writeStore(store);

  return saved || store.integrations;
}

// ENQUIRIES API
export async function getEnquiries(filters = {}) {
  try {
    await connectDB();
    if (isDbConnected()) {
      const query = {};
      if (filters.status && filters.status !== "all") {
        query.status = filters.status;
      }
      if (filters.search) {
        query.$or = [
          { name: { $regex: filters.search, $options: "i" } },
          { email: { $regex: filters.search, $options: "i" } },
          { company: { $regex: filters.search, $options: "i" } },
          { country: { $regex: filters.search, $options: "i" } },
          { product: { $regex: filters.search, $options: "i" } },
        ];
      }
      const list = await Enquiry.find(query).sort({ createdAt: -1 }).lean();
      if (list && list.length > 0) return list;
    }
  } catch (e) {}

  const store = readStore();
  let list = store.enquiries || [];
  if (filters.status && filters.status !== "all") {
    list = list.filter((e) => e.status === filters.status);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.name?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.company?.toLowerCase().includes(q) ||
        e.country?.toLowerCase().includes(q) ||
        e.product?.toLowerCase().includes(q)
    );
  }
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function saveEnquiry(enquiryData) {
  let saved = null;
  try {
    await connectDB();
    if (isDbConnected()) {
      saved = await Enquiry.create(enquiryData);
      saved = saved.toObject();
    }
  } catch (e) {}

  const store = readStore();
  if (!store.enquiries) store.enquiries = [];
  const newItem = {
    _id: saved?._id?.toString() || `enq_${Date.now()}`,
    ...enquiryData,
    status: enquiryData.status || "new",
    createdAt: new Date().toISOString(),
  };
  store.enquiries.unshift(newItem);
  writeStore(store);

  return saved || newItem;
}

export async function updateEnquiry(id, updates) {
  try {
    await connectDB();
    if (isDbConnected()) {
      await Enquiry.findByIdAndUpdate(id, updates);
    }
  } catch (e) {}

  const store = readStore();
  const index = store.enquiries.findIndex((e) => e._id === id);
  if (index >= 0) {
    store.enquiries[index] = { ...store.enquiries[index], ...updates, updatedAt: new Date().toISOString() };
    writeStore(store);
  }
  return { success: true };
}

export async function deleteEnquiry(id) {
  try {
    await connectDB();
    if (isDbConnected()) {
      await Enquiry.findByIdAndDelete(id);
    }
  } catch (e) {}

  const store = readStore();
  store.enquiries = store.enquiries.filter((e) => e._id !== id);
  writeStore(store);
  return { success: true };
}

// MEDIA API
export async function getMediaFiles() {
  try {
    await connectDB();
    if (isDbConnected()) {
      const list = await Media.find({}).sort({ createdAt: -1 }).lean();
      if (list && list.length > 0) return list;
    }
  } catch (e) {}

  const store = readStore();
  return (store.media || []).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

export async function saveMediaRecord(mediaData) {
  let saved = null;
  try {
    await connectDB();
    if (isDbConnected()) {
      saved = await Media.create(mediaData);
      saved = saved.toObject();
    }
  } catch (e) {}

  const store = readStore();
  if (!store.media) store.media = [];
  const newItem = {
    _id: saved?._id?.toString() || `media_${Date.now()}`,
    ...mediaData,
    uploadedAt: new Date().toISOString(),
  };
  store.media.unshift(newItem);
  writeStore(store);

  return saved || newItem;
}

export async function deleteMediaRecord(id) {
  try {
    await connectDB();
    if (isDbConnected()) {
      await Media.findByIdAndDelete(id);
    }
  } catch (e) {}

  const store = readStore();
  store.media = store.media.filter((m) => m._id !== id);
  writeStore(store);
  return { success: true };
}

// DASHBOARD STATS
export async function getDashboardStats() {
  const [products, ports, seo, enquiries] = await Promise.all([
    getProducts(false),
    getPorts(false),
    getSeoSettings(),
    getEnquiries({}),
  ]);

  const publishedProducts = products.filter((p) => p.status === "published").length;
  const draftProducts = products.filter((p) => p.status !== "published").length;
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;

  return {
    totalPages: 6, // Home, About, Products, Certifications, FAQ, Contact
    totalProducts: products.length,
    publishedProducts,
    draftProducts,
    totalPorts: ports.length,
    operationalPorts: ports.filter((p) => p.status?.toLowerCase().includes("operational")).length,
    totalEnquiries: enquiries.length,
    newEnquiries,
    recentEnquiries: enquiries.slice(0, 5),
    recentProducts: products.slice(0, 5),
  };
}
