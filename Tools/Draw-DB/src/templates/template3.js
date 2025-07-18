export const template3 = {
    tables: [
        {
            id: 0,
            name: "products",
            x: 331,
            y: 300,
            fields: [
                {
                    name: "id",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: true,
                    unique: true,
                    notNull: true,
                    increment: true,
                    comment: "",
                    id: 0,
                },
                {
                    name: "name",
                    type: "VARCHAR",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 1,
                    size: 255,
                },
                {
                    name: "description",
                    type: "TEXT",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 2,
                    size: 65535,
                },
                {
                    name: "price",
                    type: "DOUBLE",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 3,
                    size: "",
                },
                {
                    name: "category_id",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 4,
                },
            ],
            comment: "",
            indices: [],
            color: "#32c9b0",
        },
        {
            id: 1,
            name: "categories",
            x: 649,
            y: 391,
            fields: [
                {
                    name: "id",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: true,
                    unique: true,
                    notNull: true,
                    increment: true,
                    comment: "",
                    id: 0,
                },
                {
                    name: "name",
                    type: "VARCHAR",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 1,
                    size: 255,
                },
            ],
            comment: "",
            indices: [],
            color: "#89e667",
        },
        {
            id: 2,
            name: "orders",
            x: 756,
            y: 47,
            fields: [
                {
                    name: "id",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: true,
                    unique: true,
                    notNull: true,
                    increment: true,
                    comment: "",
                    id: 0,
                },
                {
                    name: "date",
                    type: "DATETIME",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 1,
                    size: "",
                    values: [],
                },
                {
                    name: "customer_id",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 2,
                },
                {
                    name: "amount",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 3,
                },
                {
                    name: "status",
                    type: "ENUM",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 4,
                    values: ["delivered", "recieved", "processing"],
                },
                {
                    name: "product_id",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 5,
                },
            ],
            comment: "",
            indices: [],
            color: "#6360f7",
        },
        {
            id: 3,
            name: "reviews",
            x: 33,
            y: 93,
            fields: [
                {
                    name: "id",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: true,
                    unique: true,
                    notNull: true,
                    increment: true,
                    comment: "",
                    id: 0,
                },
                {
                    name: "customer_id",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 1,
                },
                {
                    name: "product_id",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 2,
                },
                {
                    name: "rating",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 3,
                },
                {
                    name: "content",
                    type: "VARCHAR",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 4,
                    size: 255,
                },
                {
                    name: "date",
                    type: "DATETIME",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 5,
                    size: "",
                    values: [],
                },
            ],
            comment: "",
            indices: [],
            color: "#ffe159",
        },
        {
            id: 4,
            name: "customers",
            x: 402,
            y: 16,
            fields: [
                {
                    name: "id",
                    type: "INT",
                    default: "",
                    check: "",
                    primary: true,
                    unique: true,
                    notNull: true,
                    increment: true,
                    comment: "",
                    id: 0,
                },
                {
                    name: "name",
                    type: "VARCHAR",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 1,
                    size: 255,
                },
                {
                    name: "address",
                    type: "VARCHAR",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 2,
                    size: 255,
                },
                {
                    name: "email",
                    type: "VARCHAR",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 3,
                    size: 255,
                },
                {
                    name: "phone",
                    type: "VARCHAR",
                    default: "",
                    check: "",
                    primary: false,
                    unique: false,
                    notNull: false,
                    increment: false,
                    comment: "",
                    id: 4,
                    size: 255,
                },
            ],
            comment: "",
            indices: [],
            color: "#ff4f81",
        },
    ],
    relationships: [
        {
            startTableId: 2,
            startFieldId: 5,
            endTableId: 0,
            endFieldId: 0,
            name: "order_product_id_fk",
            cardinality: "One to one",
            updateConstraint: "No action",
            deleteConstraint: "No action",
            id: 0,
        },
        {
            startTableId: 0,
            startFieldId: 4,
            endTableId: 1,
            endFieldId: 0,
            name: "products_category_id_fk",
            cardinality: "Many to one",
            updateConstraint: "No action",
            deleteConstraint: "No action",
            id: 1,
        },
        {
            startTableId: 3,
            startFieldId: 1,
            endTableId: 4,
            endFieldId: 0,
            name: "reviews_customer_id_fk",
            cardinality: "Many to one",
            updateConstraint: "No action",
            deleteConstraint: "No action",
            id: 2,
        },
        {
            startTableId: 3,
            startFieldId: 2,
            endTableId: 0,
            endFieldId: 0,
            name: "reviews_product_id_fk",
            cardinality: "One to one",
            updateConstraint: "No action",
            deleteConstraint: "No action",
            id: 3,
        },
        {
            startTableId: 2,
            startFieldId: 2,
            endTableId: 4,
            endFieldId: 0,
            name: "orders_customer_id_fk",
            cardinality: "Many to one",
            updateConstraint: "No action",
            deleteConstraint: "No action",
            id: 4,
        },
    ],
    notes: [],
    subjectAreas: [],
    types: [],
    title: "E-commerce schema",
    description:
        "An e-commerce schema designed to manage various aspects of an online store, including products, orders, and customers.",
    custom: 0,
};
