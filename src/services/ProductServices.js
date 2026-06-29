import { supabase } from "./Supabase";




export const CreateProduct = async (product) => {
  return await supabase
    .from("product")
    .insert(product)
    .select()
    .single();
};

export const GetProducts = async () => {
  return await supabase
    .from("product")
    .select("*")
    .order("id", { ascending: false });
};

export const UpdateProduct = async (id, data) => {
  return await supabase
    .from("product")
    .update(data)
    .eq("id", id);
};

export const DeleteProduct = async (id) => {
  return await supabase
    .from("product")
    .delete()
    .eq("id", id);
};

 export const UploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("product")
    .upload(fileName, file);

  console.log("Upload Data:", data);
  console.log("Upload Error:", error);

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("product")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};