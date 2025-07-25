// Hàm chuẩn hóa giá trị nhập vào, trả về string hợp lệ
export function normalizeInputValue(input: string, unit: string): string {
  input = input.replace(/,/g, ".");
  // Chỉ lấy số nếu bắt đầu từ đầu chuỗi (giống parseFloat)
  const trimmed = input.trim();
  // Nếu không bắt đầu bằng số hoặc dấu - thì trả về 0
  if (!/^[-\d.]/.test(trimmed)) return "0";
  let num = parseFloat(trimmed);
  if (isNaN(num)) num = 0;
  if (num < 0) num = 0;
  if (unit === "%" && num > 100) num = 100;
  return num.toString();
}
