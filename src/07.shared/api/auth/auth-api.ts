import { logger } from "../../utils";

class AuthApi {
  refresh = async (hash: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        {
          body: JSON.stringify({ hash }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.token;
    } catch (error) {
      logger("Error in refresh", error);
    }
  };
}
const authApi = new AuthApi();
export default authApi;
