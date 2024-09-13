import { logger } from "@/07.shared/utils";
import axios from "axios";
import { IpApi } from "../model";

class ServiceIpApi {
  async getIp() {
    try {
      const { data } = await axios.get("https://ipapi.co/json/");
      const ipApi = new IpApi(data);
      return ipApi;
    } catch (error) {
      logger("Error in getting ip", error);
      return null;
    }
  }
}

const serviceIpApi = new ServiceIpApi();
export default serviceIpApi;
