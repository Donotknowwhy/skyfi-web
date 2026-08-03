"use client";
import { Button } from "@/app/components/ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const NotLoggedInCard = () => {
  const t = useTranslations("hdbank.home.simStatusCard");
  const router = useRouter();
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
        {/* SVG Content */}
        <svg
          width="122"
          height="106"
          viewBox="0 0 122 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="scale-75"
        >
          <path
            d="M60.9555 87.2246C84.0613 87.2246 102.793 68.4924 102.793 45.3042C102.793 22.1159 83.9788 3.38379 60.9555 3.38379C37.8498 3.38379 19.1177 22.1159 19.1177 45.3042C19.1177 68.4924 37.8498 87.2246 60.9555 87.2246Z"
            fill="#EAEEF9"
          />
          <path
            d="M100.07 17.8243C101.939 17.8243 103.454 16.3095 103.454 14.441C103.454 12.5724 101.939 11.0576 100.07 11.0576C98.2018 11.0576 96.687 12.5724 96.687 14.441C96.687 16.3095 98.2018 17.8243 100.07 17.8243Z"
            fill="#EAEEF9"
          />
          <path
            d="M105.022 4.62114C106.298 4.62114 107.332 3.58667 107.332 2.31057C107.332 1.03448 106.298 0 105.022 0C103.745 0 102.711 1.03448 102.711 2.31057C102.711 3.58667 103.745 4.62114 105.022 4.62114Z"
            fill="#EAEEF9"
          />
          <path
            d="M21.3457 17.7422C22.6218 17.7422 23.6563 16.7078 23.6563 15.4317C23.6563 14.1556 22.6218 13.1211 21.3457 13.1211C20.0696 13.1211 19.0352 14.1556 19.0352 15.4317C19.0352 16.7078 20.0696 17.7422 21.3457 17.7422Z"
            fill="#EAEEF9"
          />
          <path
            d="M11.6231 67.6895C13.993 67.6895 15.9142 65.7684 15.9142 63.3985C15.9142 61.0286 13.993 59.1074 11.6231 59.1074C9.25321 59.1074 7.33203 61.0286 7.33203 63.3985C7.33203 65.7684 9.25321 67.6895 11.6231 67.6895Z"
            fill="#EAEEF9"
          />
          <g filter="url(#filter0_d_359_110123)">
            <path
              d="M94.3449 72.6562H27.565C24.4947 72.6562 22 70.1616 22 67.0912V24.2984C22 21.228 24.4947 18.7334 27.565 18.7334H94.3449C97.4152 18.7334 99.9099 21.228 99.9099 24.2984V67.2831C99.718 70.1616 97.2233 72.6562 94.3449 72.6562Z"
              fill="url(#paint0_linear_359_110123)"
            />
          </g>
          <rect
            x="34.1565"
            y="20.7051"
            width="11.5646"
            height="4.25218"
            rx="1"
            fill="#D8DDEB"
          />
          <rect
            x="75.6101"
            y="20.7051"
            width="11.5646"
            height="4.25218"
            rx="1"
            fill="#D8DDEB"
          />
          <g filter="url(#filter1_d_359_110123)">
            <path
              d="M43.0684 11.0576H36.8169C36.2646 11.0576 35.8169 11.5053 35.8169 12.0576V21.6643C35.8169 22.2166 36.2646 22.6643 36.8169 22.6643H43.0684C43.6207 22.6643 44.0684 22.2166 44.0684 21.6643V12.0576C44.0684 11.5053 43.6207 11.0576 43.0684 11.0576Z"
              fill="url(#paint1_linear_359_110123)"
            />
          </g>
          <g filter="url(#filter2_d_359_110123)">
            <path
              d="M84.522 11.0576H78.2705C77.7182 11.0576 77.2705 11.5053 77.2705 12.0576V21.6643C77.2705 22.2166 77.7182 22.6643 78.2705 22.6643H84.522C85.0743 22.6643 85.522 22.2166 85.522 21.6643V12.0576C85.522 11.5053 85.0743 11.0576 84.522 11.0576Z"
              fill="url(#paint2_linear_359_110123)"
            />
          </g>
          <path
            d="M46.179 48.0939C49.6764 48.0939 52.5116 45.2587 52.5116 41.7613C52.5116 38.2639 49.6764 35.4287 46.179 35.4287C42.6816 35.4287 39.8464 38.2639 39.8464 41.7613C39.8464 45.2587 42.6816 48.0939 46.179 48.0939Z"
            stroke="#939DAE"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M36.0085 58.4586C36.0085 52.8936 40.6141 48.2881 46.179 48.2881C51.744 48.2881 56.3495 52.8936 56.3495 58.4586"
            stroke="#939DAE"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M66.9036 40.6094H87.4365"
            stroke="#939DAE"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M66.9036 50.9717H74.9632"
            stroke="#939DAE"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M73.6885 80.7443C73.4224 81.8753 73.0232 83.073 72.5574 84.071C71.2933 86.5328 69.2972 88.4623 66.8354 89.7264C64.3071 90.9906 61.313 91.5229 58.319 90.8575C51.2663 89.3938 46.7419 82.4742 48.2057 75.4215C49.6695 68.3688 56.5225 63.7779 63.5752 65.3082C66.1036 65.8405 68.2992 67.1046 70.1622 68.8345C73.2893 71.9617 74.62 76.486 73.6885 80.7443Z"
            fill="url(#paint3_linear_359_110123)"
          />
          <path
            d="M65.1055 76.9523H62.1115V73.9582C62.1115 73.3594 61.6457 72.8271 60.9804 72.8271C60.3816 72.8271 59.8493 73.2929 59.8493 73.9582V76.9523H56.8552C56.2564 76.9523 55.7241 77.418 55.7241 78.0834C55.7241 78.7487 56.1899 79.2145 56.8552 79.2145H59.8493V82.2086C59.8493 82.8074 60.315 83.3396 60.9804 83.3396C61.5792 83.3396 62.1115 82.8739 62.1115 82.2086V79.2145H65.1055C65.7043 79.2145 66.2366 78.7487 66.2366 78.0834C66.2366 77.418 65.7043 76.9523 65.1055 76.9523Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_d_359_110123"
              x="0"
              y="7.7334"
              width="121.91"
              height="97.9229"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="11" />
              <feGaussianBlur stdDeviation="11" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_359_110123"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_359_110123"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_359_110123"
              x="13.8169"
              y="0.0576172"
              width="52.2515"
              height="55.6064"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="11" />
              <feGaussianBlur stdDeviation="11" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_359_110123"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_359_110123"
                result="shape"
              />
            </filter>
            <filter
              id="filter2_d_359_110123"
              x="55.2705"
              y="0.0576172"
              width="52.2515"
              height="55.6064"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="11" />
              <feGaussianBlur stdDeviation="11" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_359_110123"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_359_110123"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_359_110123"
              x1="60.9295"
              y1="17.4861"
              x2="60.9295"
              y2="73.2376"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FDFEFF" />
              <stop offset="0.9964" stopColor="#ECF0F5" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_359_110123"
              x1="39.94"
              y1="10.7891"
              x2="39.94"
              y2="22.7895"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FDFEFF" />
              <stop offset="0.9964" stopColor="#ECF0F5" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_359_110123"
              x1="81.3936"
              y1="10.7891"
              x2="81.3936"
              y2="22.7895"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FDFEFF" />
              <stop offset="0.9964" stopColor="#ECF0F5" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_359_110123"
              x1="47.9187"
              y1="78.0825"
              x2="73.9851"
              y2="78.0825"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B0BACC" />
              <stop offset="1" stopColor="#969EAE" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h2 className="text-lg font-semibold">{t("title")}</h2>
      <p className="text-sm text-gray-600 mt-2">{t("description")}</p>
      <div className="flex gap-4 mt-4 w-full">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => router.push("/hdbank-app/activate")}
        >
          {t("activate")}
        </Button>
        <Button
          variant="normal"
          size="sm"
          className="flex-1"
          onClick={() => router.push("/hdbank-app/sim-data")}
        >
          {t("buySim")}
        </Button>
      </div>
    </div>
  );
};

export default NotLoggedInCard;
