const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5002/api";

interface ListingFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  condition?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const api = {
  listings: {
    getAll: async (filters: ListingFilters = {}) => {
      try {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });

        console.log(
          "Fetching listings with params:",
          Object.fromEntries(queryParams.entries()),
        );
        const response = await fetch(`${API_BASE_URL}/listings?${queryParams}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error("Failed to fetch listings:", {
            status: response.status,
            statusText: response.statusText,
            error: errorData,
          });
          throw new Error(`Failed to fetch listings: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched listings:", data);
        return data;
      } catch (error) {
        console.error("Error fetching listings:", error);
        throw error;
      }
    },

    getById: async (id: number) => {
      try {
        const response = await fetch(`${API_BASE_URL}/listings/${id}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error("Failed to fetch listing:", {
            id,
            status: response.status,
            statusText: response.statusText,
            error: errorData,
          });
          throw new Error(`Failed to fetch listing: ${response.statusText}`);
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching listing:", error);
        throw error;
      }
    },

    create: async (data: {
      name: string;
      description: string;
      price: number;
      imageUrl?: string;
      category: string;
      condition: string;
      sellerId: number;
    }) => {
      try {
        console.log("Creating listing with data:", data);
        const response = await fetch(`${API_BASE_URL}/listings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error("Failed to create listing:", {
            status: response.status,
            statusText: response.statusText,
            error: errorData,
          });
          throw new Error(`Failed to create listing: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Created listing:", result);
        return result;
      } catch (error) {
        console.error("Error creating listing:", error);
        throw error;
      }
    },

    update: async (
      id: number,
      data: {
        name?: string;
        description?: string;
        price?: number;
        imageUrl?: string;
        status?: string;
        category?: string;
        condition?: string;
      },
    ) => {
      const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update listing");
      }
      return response.json();
    },

    delete: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete listing");
      }
      return response.json();
    },
  },
};
