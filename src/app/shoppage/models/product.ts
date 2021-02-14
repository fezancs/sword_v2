export interface Product {
    sku:string;        
    _store	: string;
    _attribute_set	:string;
    _type :string;
    description :string; 
    name :string; 
    price : number; 
    product_page_type:string; 
    required_options :string;	
    short_description : string; 
    status :string, 
    thumbnail : string,
    thumbnail_label	:string,
    updated_at :string,	
    url_key	:string,
    url_path :string,
    visibility :string, 
    weight :string, 
    is_in_stock :boolean,
    sale:string,
    sale_percent :number,
    shipping:number,
}
