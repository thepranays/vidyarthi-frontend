export class Product {
    product_id: string
    title: string
    description: string
    price: string
    category: string
    uid: string
    type: string

    product_img: string
    createdAt: string
    updatedAt: string

    constructor(product_id: string, title: string, description: string, price: string, category: string, uid: string,
        type: string, product_img: string, createdAt: string, updatedAt: string) {
        this.product_id = product_id
        this.title = title
        this.description = description
        this.price = price
        this.category = category
        this.uid = uid
        this.type = type
        this.product_img = product_img
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
};  