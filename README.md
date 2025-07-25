# Requirement

Code UI như design và logic thỏa mãn các điều kiện sau:

## Unit

- Gồm 2 giá trị là: `%` và `px`
- Default value: `%`

## Value stepper

- Cho phép nhập các giá trị **integer** và **float**
- Nếu input chứa dấu phẩy → Thay thế thành dấu chấm
  - `12,3` → `12.3`
- Nếu input chứa các ký tự khác giá trị số phù hợp → tự động loại bỏ các giá trị:
  - `123a` → Chuyển về `123` khi out focus
  - `12a3` → Chuyển về `12` khi out focus
  - `a123` → Chuyển về giá trị đúng gần nhất khi out focus
  - `12.4.5` → Chuyển về giá trị đúng gần nhất khi out focus

- User nhập `< 0` và out focus sẽ tự động nhảy về `0`

### Nếu Unit là `%`:

- User nhập `> 100` và out focus sẽ tự động nhảy về giá trị hợp lệ trước khi nhập
- Nếu giá trị trong ô input hiện tại là `0` → Disable button `“-”`
- Nếu giá trị trong ô input hiện tại là `100` → Disable button `"+
