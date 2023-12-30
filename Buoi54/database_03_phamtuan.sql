CREATE TABLE "KHACH_HANG" (
  "MaKH" varchar(10) PRIMARY KEY,
  "TenKH" varchar(50) NOT NULL,
  "SoDT" varchar(50) UNIQUE NOT NULL,
  "DiaChi" varchar(100) NOT NULL,
  "CreatedAt" timestamptz DEFAULT (now()),
  "UpdatedAt" timestamptz DEFAULT (now())
);

CREATE TABLE "PHONG" (
  "MaPhong" varchar(10) PRIMARY KEY,
  "LoaiPhong" varchar(50) NOT NULL,
  "SoKhachToiDa" integer NOT NULL,
  "GiaPhong" float NOT NULL,
  "MoTa" text,
  "CreatedAt" timestamptz DEFAULT (now()),
  "UpdatedAt" timestamptz DEFAULT (now())
);

CREATE TABLE "DAT_PHONG" (
  "MaDatPhong" varchar(10) PRIMARY KEY,
  "MaPhong" varchar(10),
  "MaKH" varchar(10),
  "NgayDat" timestamptz DEFAULT (now()),
  "GioBatDau" time,
  "GioKetThuc" time,
  "TienDatCoc" float,
  "GhiChu" text,
  "TrangThaiDat" varchar(50) NOT NULL
);

CREATE TABLE "CHI_TIET_SU_DUNG_DV" (
  "MaDv" varchar(10),
  "MaDatPhong" varchar(10),
  "Soluong" integer,
  PRIMARY KEY ("MaDv", "MaDatPhong")
);

CREATE TABLE "DICH_VU_DI_KEM" (
  "MaDv" varchar(10) PRIMARY KEY,
  "TenDv" varchar(50) NOT NULL,
  "DonViTinh" varchar(20),
  "DonGia" float,
  "CreatedAt" timestamptz DEFAULT (now()),
  "UpdatedAt" timestamptz DEFAULT (now())
);

ALTER TABLE "DAT_PHONG" ADD FOREIGN KEY ("MaKH") REFERENCES "KHACH_HANG" ("MaKH");

ALTER TABLE "DAT_PHONG" ADD FOREIGN KEY ("MaPhong") REFERENCES "PHONG" ("MaPhong");

ALTER TABLE "CHI_TIET_SU_DUNG_DV" ADD FOREIGN KEY ("MaDatPhong") REFERENCES "DAT_PHONG" ("MaDatPhong");

ALTER TABLE "CHI_TIET_SU_DUNG_DV" ADD FOREIGN KEY ("MaDv") REFERENCES "DICH_VU_DI_KEM" ("MaDv");


INSERT INTO "KHACH_HANG" ("MaKH", "TenKH", "SoDT", "DiaChi")
VALUES
  ('KH0001', 'Nguyen Van A', '11111111', 'Hoa Xuan'),
  ('KH0002', 'Nguyen Van B', '11111112', 'Hoa hai'),
  ('KH0003', 'Phan Van A', '11111113', 'Cam le'),
  ('KH0004', 'Phan Van B', '11111114', 'Hoa Xuan')
  
INSERT INTO "PHONG" ("MaPhong", "LoaiPhong", "SoKhachToiDa", "GiaPhong","MoTa")
VALUES 
  ('P0001', 'Loai 1', 20,60.000,''),
  ('P0002', 'Loai 1', 25,80.000,''),
  ('P0003', 'Loai 2', 15,50.000,''),
  ('P0004', 'Loai 3', 20,50.000,'')
  
INSERT INTO "DAT_PHONG" ("MaDatPhong", "MaPhong", "MaKH", "NgayDat","GioBatDau","GioKetThuc","TienDatCoc","GhiChu","TrangThaiDat")
VALUES 
  ('DP0001','P0001','KH0002','now()','11:00:00','13:30:00','100.000','','Da dat'),
  ('DP0002','P0001','KH0003','now()','17:15:00','19:15:00','50.000','','Da huy'),
  ('DP0003','P0002','KH0002','now()','20:30:00','22:15:00','100.000','','Da dat'),
  ('DP0004','P0003','KH0001','now()','19:30:00','21:15:00','200.000','','Da dat')
  
INSERT INTO "DICH_VU_DI_KEM" ("MaDv", "TenDv", "DonViTinh", "DonGia")
VALUES 
  ('DV001', 'Beer', 'lon',10.000),
  ('DV002', 'Nuoc ngot', 'lon',8.000),
  ('DV003', 'Trai cay','dia',35.000),
  ('DV004', 'Khan uot', 'cai',2.000)

INSERT INTO "CHI_TIET_SU_DUNG_DV" ("MaDv", "MaDatPhong", "Soluong")
VALUES 
  ( 'DV001','DP0001',20),
  ( 'DV003','DP0001',3),
  ( 'DV002','DP0001',10),
  ( 'DV002','DP0002',10),
  ( 'DV003','DP0002',1),
  ( 'DV003','DP0003',2),
  ( 'DV004','DP0003',10)
  
/* Cau1: Hiển thị MaDatPhong, MaPhong, LoaiPhong, GiaPhong, 
TenKH, NgayDat, TongTienHat, TongTienSuDungDichVu, TongTienThanhToan 
tương ứng với từng mã đặt phòng có trong bảng DAT_PHONG. 
Những đơn đặt phòng nào không sử dụng dịch vụ đi kèm thì cũng liệt kê 
thông tin của đơn đặt phòng đó ra
*/

SELECT 
    "DAT_PHONG"."MaDatPhong",
    "PHONG"."MaPhong",
    "PHONG"."LoaiPhong",
    "PHONG"."GiaPhong",
    "DAT_PHONG"."NgayDat",
    "PHONG"."GiaPhong" * EXTRACT(EPOCH FROM ("DAT_PHONG"."GioKetThuc" - "DAT_PHONG"."GioBatDau")) / 3600 AS "TongTienDat",
    SUM(
        CASE WHEN "CHI_TIET_SU_DUNG_DV"."Soluong" IS NOT NULL AND "DICH_VU_DI_KEM"."DonGia" IS NOT NULL
             THEN "CHI_TIET_SU_DUNG_DV"."Soluong" * "DICH_VU_DI_KEM"."DonGia" 
             ELSE 0 
        END
    ) AS "TongTienDichVu",
    "PHONG"."GiaPhong" * EXTRACT(EPOCH FROM ("DAT_PHONG"."GioKetThuc" - "DAT_PHONG"."GioBatDau")) / 3600 +
    SUM(
        CASE WHEN "CHI_TIET_SU_DUNG_DV"."Soluong" IS NOT NULL AND "DICH_VU_DI_KEM"."DonGia" IS NOT NULL
             THEN "CHI_TIET_SU_DUNG_DV"."Soluong" * "DICH_VU_DI_KEM"."DonGia" 
             ELSE 0 
        END
    ) AS "TongTienThanhToan"
FROM 
    "PHONG"
INNER JOIN 
    "DAT_PHONG" ON "PHONG"."MaPhong" = "DAT_PHONG"."MaPhong"
LEFT JOIN 
    "CHI_TIET_SU_DUNG_DV" ON "DAT_PHONG"."MaDatPhong" = "CHI_TIET_SU_DUNG_DV"."MaDatPhong"
LEFT JOIN 
    "DICH_VU_DI_KEM" ON "CHI_TIET_SU_DUNG_DV"."MaDv" = "DICH_VU_DI_KEM"."MaDv"
GROUP BY
    "DAT_PHONG"."MaDatPhong",
    "PHONG"."MaPhong"

/* Cau2: Hiển thị MaKH, TenKH, DiaChi, SoDT của những khách hàng 
đã từng đặt phòng karaoke có địa chỉ ở “Hoa xuan”
*/
SELECT 
"KHACH_HANG"."MaKH",
"KHACH_HANG"."TenKH",
"KHACH_HANG"."DiaChi",
"KHACH_HANG"."SoDT"
FROM "KHACH_HANG"
INNER JOIN "DAT_PHONG" ON "KHACH_HANG"."MaKH" = "DAT_PHONG"."MaKH"
WHERE LOWER("KHACH_HANG"."DiaChi") = LOWER('Hoa xuan')

/* Câu 3: Hiển thị MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, SoLanDat của những
phòng được khách hàng đặt  có số lần đặt lớn hơn 2 lần và trạng thái đặt là “Da dat”
*/
SELECT
"PHONG"."MaPhong",
"PHONG"."LoaiPhong",
"PHONG"."SoKhachToiDa",
"PHONG"."GiaPhong",
COUNT("DAT_PHONG"."MaDatPhong")
FROM "PHONG"
INNER JOIN "DAT_PHONG" ON "PHONG"."MaPhong" = "DAT_PHONG"."MaPhong"
WHERE LOWER("DAT_PHONG"."TrangThaiDat") = LOWER('Da dat')
GROUP BY "PHONG"."MaPhong"
HAVING COUNT("DAT_PHONG"."MaDatPhong") > 2

