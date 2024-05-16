export interface UpdateCategoryDTO extends Record<"id", number> {
  name?: string;
  description?: string;
  is_active?: boolean;
}
