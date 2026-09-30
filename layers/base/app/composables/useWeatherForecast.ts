type WeatherCondition =
  | "Sunny"
  | "Partly Cloudy"
  | "Cloudy"
  | "Light Rain"
  | "Thunderstorms"
  | "Snow"
  | "Windy";

interface WeatherDay {
  weekdayLong: string;
  monthLong: string;
  monthShort: string;
  dayOfMonth: number;
  year: number;
  dateStringFull: string; // e.g. "Friday, August 21, 2026"
  dateStringShort: string; // e.g. "Aug 21, 2026"
  condition: WeatherCondition;
  iconName: string; // lucide icon to use
  iconColorClass: string; // text color utility
  tempHiC: number;
  tempLoC: number;
  humidityPct: number;
  windKmh: number;
  location: string;
  description: string;
}

const WEEKDAY_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTH_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function useWeatherForecast() {
  const weatherToday = computed<WeatherDay>(() => {
    const now = new Date();
    const monthIdx = now.getMonth(); // 0-11
    const dayOfMonth = now.getDate();
    const year = now.getFullYear();
    const weekdayIdx = now.getDay();
    const weekdayLong = WEEKDAY_LONG[weekdayIdx] ?? "Sunday";
    const monthLong = MONTH_LONG[monthIdx] ?? "January";
    const monthShort = monthLong.slice(0, 3);

    // ── Season → sensible defaults (Northern-Hemisphere assumption) ──
    let condition: WeatherCondition;
    let iconName: string;
    let iconColorClass: string;
    let tempHiC: number;
    let tempLoC: number;
    let humidityPct: number;
    let windKmh: number;
    let description: string;

    switch (monthIdx) {
      case 11:
      case 0:
      case 1: // Dec / Jan / Feb — Winter
        condition = "Cloudy";
        iconName = "i-lucide-cloud";
        iconColorClass = "text-slate-500";
        tempHiC = 10;
        tempLoC = 2;
        humidityPct = 72;
        windKmh = 18;
        description = "Cool and overcast";
        break;
      case 2:
      case 3:
      case 4: // Mar / Apr / May — Spring
        condition = "Partly Cloudy";
        iconName = "i-lucide-cloud-sun";
        iconColorClass = "text-amber-500";
        tempHiC = 21;
        tempLoC = 11;
        humidityPct = 58;
        windKmh = 14;
        description = "Pleasant with some clouds";
        break;
      case 5:
      case 6:
      case 7: // Jun / Jul / Aug — Summer
        condition = "Sunny";
        iconName = "i-lucide-sun";
        iconColorClass = "text-orange-500";
        tempHiC = 31;
        tempLoC = 22;
        humidityPct = 48;
        windKmh = 10;
        description = "Hot and clear skies";
        break;
      case 8:
      case 9:
      case 10: // Sep / Oct / Nov — Fall / Autumn
      default:
        condition = "Light Rain";
        iconName = "i-lucide-cloud-rain";
        iconColorClass = "text-sky-500";
        tempHiC = 19;
        tempLoC = 10;
        humidityPct = 78;
        windKmh = 20;
        description = "Mild with occasional showers";
        break;
    }

    // Ordinal suffix helper: 1 → "1st", 22 → "22nd"
    const ordinal = (n: number): string => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      const suffix = s[(v - 20) % 10];
      if (suffix) return n + suffix;
      const fallback = s[v];
      if (fallback) return n + fallback;
      return n + "th";
    };

    return {
      weekdayLong,
      monthLong,
      monthShort,
      dayOfMonth,
      year,
      dateStringFull: `${weekdayLong}, ${monthLong} ${ordinal(dayOfMonth)}, ${year}`,
      dateStringShort: `${monthShort} ${dayOfMonth}, ${year}`,
      condition,
      iconName,
      iconColorClass,
      tempHiC,
      tempLoC,
      humidityPct,
      windKmh,
      location: "Manila, Philippines",
      description,
    };
  });

  return { ...weatherToday.value };
}
