import { resolve } from "core-js/fn/promise";
import request from "./request.js";
const api = {};

//获取所有商品
export function getAllGoods(url) {
  return request.get(url);
}

// 获取轮播图
export function getBanner(url) {
  return request.get(url);
}

//获取商品详情
export function getGoodsDetail(url, params) {
  return request.get(url, {
    params: params,
  });
}

export function post(url, data) {
  return request.post(url, data);
}
