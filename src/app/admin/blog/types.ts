export type BlogStatus = "draft" | "published";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  content: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  coverImage: { url: string; alt: string };
};

export type BlogFormData = Omit<Blog, "id" | "slug" | "publishedAt" | "createdAt">;

export const blankForm: BlogFormData = {
  title: "",
  subtitle: "",
  content: "",
  category: "",
  tags: [],
  status: "draft",
  featured: false,
  coverImage: { url: "", alt: "" },
};
