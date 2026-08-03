import axios from 'axios';

export function mapTabToApiType(activeTab) {
  switch (activeTab) {
    case 'national':
      return 'COUNTRY';
    case 'regional':
      return 'REGIONAL';
    case 'global':
      return 'GLOBAL';
    default:
      return '';
  }
}

export async function getRegionsByType(apiType) {
  if (!apiType) return [];

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/get-regions-by-type/v2/${apiType}`;
  try {
    const response = await axios.get(apiUrl);
    const data = response?.data;
    if (data && data.code === 200) {
      return data.result || [];
    }
    return [];
  } catch (error) {
    // Keep console.error consistent with existing page behavior without throwing
    // eslint-disable-next-line no-console
    console.error(`Không thể tải dữ liệu ${apiType}:`, error.response ? error.response.data : error.message);
    return [];
  }
}


