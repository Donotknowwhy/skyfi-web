import dayjs from "dayjs";
import { simPriceTotal } from "./calculate";

export function formatDate(date) {
  if (!date) {
    return "-";
  }
  return dayjs(date).format("DD/MM/YYYY");
}

export function toCurrency(price, currency = "VND") {
  // check if price is a number
  if (isNaN(price)) {
    return "0 " + currency;
  }
  return price?.toLocaleString("vi") + " " + currency;
}
export function toNumber(price) {
  return price.toLocaleString("vi") + "";
}
export function formatPhoneNumber(phoneNumber) {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  const formattedNumber = cleanedNumber.replace(
    /(\d{4})(\d{3})(\d{3})/,
    "$1 $2 $3",
  );

  return formattedNumber;
}

// Gói DAILY: data hiển thị theo ngày (vd: "1 GB/ngày"), perDay là chuỗi đã dịch theo locale
export const dailySuffix = (pkg, perDay = "/ngày") =>
  String(pkg?.type || "").toUpperCase() === "DAILY" ? perDay : "";

export const convertSims = (sim, isVikkiGift = false) => {
  let sim_price = sim.sim_type == "USIM" ? sim.usim_price : sim.esim_price;
  let total = simPriceTotal(sim, sim.sim_type, sim.pack_price, isVikkiGift);

  return {
    product_name: sim.msisdn,
    sim_type: sim.sim_type,
    // "region_id": 213,
    pack_code: sim.pack_code,
    base_price: sim.base_price,
    sale_price: sim.sale_price,
    quantity: sim.quantity ?? 1,
    pack_price: sim.pack_price,
    sim_price: sim_price,
    msisdn_id: sim.msisdn_id,
    product_id: sim.product_id,
    total_price: total.sale_price,
    total_base_price: total.base_price,
  };
};

export const convertSimVikki = (sim) => {
  let sim_type = sim.isSim == "0" ? "USIM" : "ESIM";
  let sim_price = sim.isSim == "0" ? sim.usim_price : sim.esim_price;
  let total = simPriceTotal(sim, sim_type, sim.packagePrice);

  return {
    product_name: sim.msisdn,
    sim_type: sim_type,
    // "region_id": 213,
    pack_code: sim.package,
    base_price: sim.base_price,
    sale_price: sim.sale_price,
    quantity: sim.quantity ?? 1,
    pack_price: sim.packagePrice,
    sim_price: sim_price,
    msisdn_id: sim.msisdn_id,
    product_id: sim.product_id,
    total_price: total.sale_price,
    total_base_price: total.base_price,
  };
};

export const convertDataSimCheckoutVikki = (data, sim) => {
  return {
    email: data.email,
    contact_phone: data.phoneNumber,
    customer_name: "LÊ VĂN ỨNG",
    city_id: data.city,
    district_id: data.district,
    ward_id: data.ward,
    delivery_address: data.deliveryAddress,
    total_amount: 0,
    shipping_amount: 25000,
    // discount_amount: 0,
    // coupon_code: "",
    // hasPhysicalSim: true,
    // agreeTerms: false,
    // agreeTermsPhysical: true,
    // agreeTermsEsim: false,
    // payment_method: "GALAXYPAY",
    // isFullEsim: false,
    // hasEsim: false,
    items: [sim],
    source: "WEB",
  };
};

export const convertSimAddToCart = (sim) => {
  return {
    product_id: sim.product_id,
    variant_id: sim.variant_id,
    msisdn_id: sim.msisdn_id,
    quantity: sim.quantity ?? 1,
    pack_code: sim.pack_code,
    sim_type: sim.sim_type,
  };
};
export const convertSimTravelToCart = (sim, quantity) => {
  let quantityNew =
    typeof quantity === "string" ? parseInt(quantity) : (quantity ?? 1);
  return {
    product_id: sim.product_id,
    variant_id: sim.variant_id,
    msisdn_id: null,
    quantity: quantityNew,
    pack_code: null,
    sim_type: "ESIM_TRAVEL",
    region_id: sim.region_id,
  };
};
export const convertSimTravel = (sim, quantity) => {
  const convertIcon = (countries_array) => {
    let data = countries_array;
    let icon = data[0]?.image?.url;
    if (!icon) {
      icon =
        "https://sandbox.airalo.com/images/24b6b038-8130-4fba-9b41-ef42d6ae4e44.png";
    }
    return icon;
  };
  return {
    product_name: sim.countries_array[0]?.name,
    sim_type: "ESIM_TRAVEL",
    region_id: sim.region_id,
    pack_code: sim.name,
    sale_price: sim.selling_price,
    quantity: quantity ?? 1,
    pack_price: null,
    icon: convertIcon(sim.countries_array),
    msisdn_id: null,
    product_id: sim.product_id,
    total_price: sim.selling_price * (quantity ?? 1),
  };
};
// {
//     "name": "3 GB - 30 Days",
//     "region_id": 210,
//     "selling_price": 299000,
//     "currency": "VND",
//     "data_amount": 3,
//     "data_unit": "GB",
//     "validity_days": 30,
//     "variant_id": 901,
//     "product_id": 901,
//     "countries_array": {
//         "type": "jsonb",
//         "value": "[{\"image\": {\"url\": \"https://sandbox.airalo.com/images/24b6b038-8130-4fba-9b41-ef42d6ae4e44.png\", \"width\": 132, \"height\": 99}, \"title\": \"Slovenia\", \"country_code\": \"SI\"}]",
//         "null": true
//     },
//     "countries_size": 1
// }
