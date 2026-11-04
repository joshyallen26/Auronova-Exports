import { createContext, useContext, useState, useEffect } from "react";
import { spices as fallbackSpices } from "@/data/spices";
import { keralaPorts as fallbackPorts } from "@/data/ports";
import { initialIntegrations, initialWebsiteContent } from "@/lib/defaultData";

const WebsiteDataContext = createContext({
  products: fallbackSpices,
  ports: fallbackPorts,
  content: {},
  integrations: initialIntegrations,
  loading: false,
  refreshData: () => {},
});

export function WebsiteDataProvider({ children }) {
  const [products, setProducts] = useState(fallbackSpices);
  const [ports, setPorts] = useState(fallbackPorts);
  const [content, setContent] = useState({});
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/content/public");
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          if (json.data.products && json.data.products.length > 0) {
            setProducts(json.data.products);
          }
          if (json.data.ports && json.data.ports.length > 0) {
            setPorts(json.data.ports);
          }
          if (json.data.content) {
            setContent(json.data.content);
          }
          if (json.data.integrations) {
            setIntegrations(json.data.integrations);
          }
        }
      }
    } catch (e) {
      // Gracefully silent fallback to static data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <WebsiteDataContext.Provider
      value={{
        products,
        ports,
        content,
        integrations,
        loading,
        refreshData,
      }}
    >
      {children}
    </WebsiteDataContext.Provider>
  );
}

export function useWebsiteData() {
  return useContext(WebsiteDataContext);
}
