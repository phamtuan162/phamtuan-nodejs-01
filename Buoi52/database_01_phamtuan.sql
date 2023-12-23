/*
--1. Tạo bảng courses có cấu trúc như sau
id => Kiểu int, NOT NULL
name => Kiểu varchar, NOT NULL
price => Kiểu float
detail => Kiểu text
teacher_id => Kiểu int, NOT NULL
active => Kiểu int
created_at => Kiểu timestamp
updated_at => Kiểu timestamp
*/
CREATE TABLE courses(
 id INT NOT NULL,
 name VARCHAR(50) NOT NULL,
 price FLOAT,
 detail TEXT,
 teacher_id INT NOT NULL,
 active INT,
 created_at  TIMESTAMP with TIME ZONE,
 updated_at  TIMESTAMP with TIME ZONE
);

/*
--2. Thêm trường description trước trường detail với kiểu dữ liệu và ràng buộc sau:
Kiểu text
NULL
*/
ALTER TABLE courses
ADD COLUMN description TEXT;

--3. Đổi tên trường detail thành content và ràng buộc chuyển thành NOT NULL
ALTER TABLE courses
RENAME COLUMN detail TO content;

ALTER TABLE courses
ALTER COLUMN content SET NOT NULL;

/*
--4. Tạo bảng teacher có cấu trúc như sau
id => Kiểu int, NOT NULL
name => Kiểu varchar, NOT NULL
bio => Kiểu text, NULL
created_at => Kiểu timestamp
updated_at => Kiểu timestamp
*/
CREATE TABLE teacher(
    id INT NOT NULL,
	name varchar(50) NOT NULL,
	bio TEXT,
	created_at TIMESTAMP with TIME ZONE,
	updated_at TIMESTAMP with TIME ZONE
);

--5. Thêm 3 giảng viên vào bảng teacher
INSERT INTO teacher(  id,name , bio , created_at, updated_at)
VALUES  (1, 'Nguyễn Văn A', ' 1 năm kinh nghiệm làm việc', NOW() , NOW()),
		( 2,'Nguyễn Văn B', ' 2 năm kinh nghiệm làm việc', NOW() , NOW()),
		( 3,'Nguyễn Văn C', ' 3 năm kinh nghiệm làm việc', NOW() , NOW())

--6. Sửa tên và giá từng khóa học thành tên mới và giá mới 
--(Tên khóa học, giá khóa học các khóa học không được giống nhau)
INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at, description)
VALUES 
  (1, 'Lập Trình Java', 580000, 'Một ngôn ngữ lập trình mạnh mẽ và đa nền tảng, được sử dụng rộng rãi trong phát triển ứng dụng desktop và di động.', 1, 1, NOW(), NOW(), 'Khám phá sức mạnh của lập trình Java và ứng dụng trong phát triển ứng dụng đa nền tảng.'),
  (2, 'Cấu Trúc Dữ Liệu và Giải Thuật', 650000, 'Là cách tổ chức và lưu trữ thông tin, trong khi giải thuật là bước-by-bước hướng dẫn để giải quyết một vấn đề cụ thể. Sự kết hợp linh hoạt giữa cấu trúc dữ liệu và giải thuật là quyết định quan trọng để tối ưu hóa hiệu suất của chương trình.', 1, 0, NOW(), NOW(), 'Tìm hiểu về cấu trúc dữ liệu và giải thuật và cách chúng tối ưu hóa hiệu suất của chương trình.'),
  (3, 'Lập Trình Nâng Cao', 400000, 'Việc áp dụng kiến thức sâu rộng về thiết kế phần mềm và sử dụng các nguyên tắc như SOLID để viết mã chất lượng. Nó tập trung vào việc phát triển mã nguồn hiệu quả, dễ bảo trì và sử dụng các tính năng cao cấp của ngôn ngữ lập trình.', 1, 1, NOW(), NOW(), 'Học cách áp dụng kiến thức sâu rộng về lập trình nâng cao và viết mã chất lượng.'),
  (4, 'Tiếng Anh A1', 600000, 'Học cách sử dụng tiếng Anh cơ bản và xây dựng từ vựng cho trình độ A1.', 2, 1, NOW(), NOW(), 'Cải thiện kỹ năng tiếng Anh cơ bản và xây dựng từ vựng ở trình độ A1.'),
  (5, 'Tiếng Anh A2', 500000, 'Học cách sử dụng tiếng Anh ở trình độ A2 và nâng cao kỹ năng ngôn ngữ.', 2, 0, NOW(), NOW(), 'Nâng cao trình độ tiếng Anh lên A2 và phát triển kỹ năng giao tiếp.'),
  (6, 'Tiếng Anh Chuyên Ngành', 540000, 'Học ngôn ngữ chuyên ngành và kỹ thuật tiếng Anh trong lĩnh vực chuyên môn.', 2, 0, NOW(), NOW(), 'Chinh phục tiếng Anh chuyên ngành và phát triển kỹ năng ngôn ngữ trong lĩnh vực chuyên môn.'),
  (7, 'Lập Trình Mạng', 520000, 'Liên quan đến phát triển mã chương trình để tương tác và quản lý thiết bị, dịch vụ, hoặc dữ liệu trên mạng máy tính. Sử dụng các ngôn ngữ và thư viện đặc biệt.', 3, 1, NOW(), NOW(), 'Học cách lập trình mạng để tương tác và quản lý thiết bị, dịch vụ và dữ liệu trên mạng máy tính.'),
  (8, 'An Ninh Mạng', 660000, 'Tập trung vào bảo vệ hệ thống và dữ liệu trước các mối đe dọa mạng thông qua việc triển khai biện pháp an ninh như mã hóa, xác thực và giám sát lưu lượng mạng.', 3, 1, NOW(), NOW(), 'Chuyên sâu về an ninh mạng và cách bảo vệ hệ thống và dữ liệu.'),
  (9, 'Lập Trình Python', 700000, 'Viết mã sử dụng ngôn ngữ lập trình Python linh hoạt và dễ đọc, thích hợp cho nhiều ứng dụng từ phân tích dữ liệu đến phát triển web.', 3, 0, NOW(), NOW(), 'Học lập trình Python và áp dụng nó vào nhiều lĩnh vực từ phân tích dữ liệu đến phát triển web.');

ALTER TABLE courses
ADD CONSTRAINT courses_name_unique UNIQUE (name);

ALTER TABLE courses
ADD CONSTRAINT courses_price_unique UNIQUE (price);

WITH data(id, new_name, new_price) AS (
    VALUES 
        (1, 'Lập Trình hướng đối tượng 2023', 550000),
        (2, 'Cấu trúc dữ liệu và giải thuật 2023', 760000),
        (3, 'Lập trình nâng cao 2023', 450000),
        (4, 'Tiếng Anh A1 2023', 600000),
        (5, 'Tiếng Anh A2 2023', 500000),
        (6, 'Tiếng Anh Chuyên Ngành 2023', 400000),
        (7, 'Lập trình Mạng 2023', 520000),
        (8, 'An ninh mạng 2023', 660000),
	    (9, 'Lập trình Python 2023', 700000)

)
UPDATE courses AS c
SET 
    name = data.new_name,
    price = data.new_price,
    updated_at = NOW()
FROM data
WHERE c.id BETWEEN 1 AND (SELECT COUNT(*) FROM courses) AND c.id = data.id;




Delete from courses

--7. Sửa lại bio của từng giảng viên (Bio từng giảng viên không được giống nhau)
ALTER TABLE teacher
ADD CONSTRAINT teacher_bio_unique UNIQUE (bio);

WITH data(id, new_bio) AS (
    VALUES 
        (1, '4 năm kinh nghiệm làm việc'),
        (2, '3 năm kinh nghiệm làm việc'),
        (3, '2 năm kinh nghiệm làm việc')
)
UPDATE teacher AS t
SET 
    bio = data.new_bio,
    updated_at = NOW()
FROM data
WHERE t.id BETWEEN 1 AND (SELECT COUNT(*) FROM teacher) AND t.id = data.id;


--8. Hiển thị danh sách giảng viên
SELECT * FROM teacher;

--9. Hiển thị danh sách khóa học
SELECT * FROM courses;

