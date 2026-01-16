const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export const apiRequest = async (endpoint, options = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle unauthorized/expired tokens
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user"); // Clear user data as well

      // Prevent infinite redirect loops if already on login page
      if (!window.location.pathname.includes("/admin/login")) {
        window.location.href = "/admin/login?error=session_expired";
      }
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// 1. Authentication
export const login = (email, password) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

// 2. Users
export const getUsers = () => apiRequest("/users", { method: "GET" });
export const getUserById = (id) =>
  apiRequest(`/users/${id}`, { method: "GET" });
export const createUser = (userData) =>
  apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
export const updateUser = (id, userData) =>
  apiRequest(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
export const deleteUser = (id) =>
  apiRequest(`/users/${id}`, { method: "DELETE" });
export const getMe = () => apiRequest("/users/me", { method: "GET" });

// 3. Categories (for Blogs)
export const getCategories = () => apiRequest("/categories", { method: "GET" });
export const createCategory = (categoryData) =>
  apiRequest("/categories", {
    method: "POST",
    body: JSON.stringify(categoryData),
  });
export const deleteCategory = (id) =>
  apiRequest(`/categories/${id}`, { method: "DELETE" });

// 4. Blogs
export const getBlogs = () => apiRequest("/blogs", { method: "GET" });
export const getBlogBySlug = (slug) =>
  apiRequest(`/blogs/${slug}`, { method: "GET" });
export const getBlogById = (id) =>
  apiRequest(`/blogs/${id}`, { method: "GET" });
export const createBlog = (blogData) =>
  apiRequest("/blogs", {
    method: "POST",
    body: JSON.stringify(blogData),
  });
export const updateBlog = (id, blogData) =>
  apiRequest(`/blogs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(blogData),
  });
export const deleteBlog = (id) =>
  apiRequest(`/blogs/${id}`, { method: "DELETE" });

// 5. Projects
export const getProjects = () => apiRequest("/projects", { method: "GET" });
export const getProjectById = (id) =>
  apiRequest(`/projects/${id}`, { method: "GET" });
export const createProject = (projectData) =>
  apiRequest("/projects", {
    method: "POST",
    body: JSON.stringify(projectData),
  });
export const updateProject = (id, projectData) =>
  apiRequest(`/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify(projectData),
  });
export const deleteProject = (id) =>
  apiRequest(`/projects/${id}`, { method: "DELETE" });

// 6. Services
export const getServices = () => apiRequest("/services", { method: "GET" });
export const getServiceById = (id) =>
  apiRequest(`/services/${id}`, { method: "GET" });
export const createService = (serviceData) =>
  apiRequest("/services", {
    method: "POST",
    body: JSON.stringify(serviceData),
  });
export const updateService = (id, serviceData) =>
  apiRequest(`/services/${id}`, {
    method: "PATCH",
    body: JSON.stringify(serviceData),
  });
export const deleteService = (id) =>
  apiRequest(`/services/${id}`, { method: "DELETE" });

// 7. Testimonials
export const getTestimonials = () =>
  apiRequest("/testimonials", { method: "GET" });
export const createTestimonial = (testimonialData) =>
  apiRequest("/testimonials", {
    method: "POST",
    body: JSON.stringify(testimonialData),
  });
export const getTestimonialById = (id) =>
  apiRequest(`/testimonials/${id}`, { method: "GET" });
export const updateTestimonial = (id, testimonialData) =>
  apiRequest(`/testimonials/${id}`, {
    method: "PATCH",
    body: JSON.stringify(testimonialData),
  });
export const deleteTestimonial = (id) =>
  apiRequest(`/testimonials/${id}`, { method: "DELETE" });

// 8. Pricing Plans
export const getPricing = () => apiRequest("/pricing", { method: "GET" });
export const getPricingById = (id) =>
  apiRequest(`/pricing/${id}`, { method: "GET" });
export const createPricing = (pricingData) =>
  apiRequest("/pricing", {
    method: "POST",
    body: JSON.stringify(pricingData),
  });
export const updatePricing = (id, pricingData) =>
  apiRequest(`/pricing/${id}`, {
    method: "PUT",
    body: JSON.stringify(pricingData),
  });
export const deletePricing = (id) =>
  apiRequest(`/pricing/${id}`, { method: "DELETE" });

// 9. Skills
export const getSkills = () => apiRequest("/skills", { method: "GET" });
export const createSkill = (skillData) =>
  apiRequest("/skills", {
    method: "POST",
    body: JSON.stringify(skillData),
  });
export const bulkUpdateSkills = (skillsData) =>
  apiRequest("/skills/bulk-update", {
    method: "PATCH",
    body: JSON.stringify(skillsData),
  });
export const deleteSkill = (id) =>
  apiRequest(`/skills/${id}`, { method: "DELETE" });
