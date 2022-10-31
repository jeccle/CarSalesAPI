using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace CarSalesAPI.Models
{
    public static class CarModelBuilder
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category { ID = 1, type = "Sedan" },
                new Category { ID = 2, type = "SUV" },
                new Category { ID = 3, type = "Ute" },
                new Category { ID = 4, type = "4x4" },
                new Category { ID = 5, type = "Wagon" },
                new Category { ID = 6, type = "Hatchback" },
                new Category { ID = 7, type = "2-Door"});

            modelBuilder.Entity<Product>().HasData(
                new Product { ID = 1, categoryID = 1, brand = "Toyota", model = "Camry", year = 2011, salePrice = 27656, onSale = true, engineSize = 2000, img = "https://img.autoabc.lv/toyota-camry/toyota-camry_2011_Sedans_15102235548_4.jpg" },
                new Product { ID = 2, categoryID = 2, brand = "Ford", model = "Kuga", year = 2011, salePrice = 35000, onSale = true, engineSize = 2000, img = "https://img.autoabc.lv/Ford-Kuga/Ford-Kuga_2008_Apvidus_15114114323_4.jpg" },
                new Product { ID = 3, categoryID = 1, brand = "Mercedes", model = "E200", year = 2014, salePrice = 33000, onSale = true, engineSize = 2000, img = "https://images.carexpert.com.au/crop/800/500/vehicles/source-g/5/3/53e62da0.jpg" },
                new Product { ID = 4, categoryID = 6, brand = "Hyundai", model = "Veloster", year = 2014, salePrice = 125000, onSale = true, engineSize = 2000, img = "https://redbook.pxcrush.net/redbookcars/car/cil/hyun2976.jpg?pxc_method=gravityfill&pxc_bgtype=self&pxc_size=900%2C600" },
                new Product { ID = 5, categoryID = 7, brand = "Lotus", model = "340r", year = 2012, salePrice = 9000, onSale = true, engineSize = 1000, img = "https://img.drivemag.net/jato_car_photos/LOTUS%2F340R%2Fconvertible%2F2%2F2000%2Fexterior-photos%2Fo%2Flotus-340r-convertible-2-doors-2000-model-exterior-photos-0.jpg" },
                new Product { ID = 6, categoryID = 6, brand = "Hyundai", model = "Veloster", year = 2012, salePrice = 22000, onSale = true, engineSize = 2000, img = "https://carsales.pxcrush.net/car/spec/hyun3224.jpg?pxc_method=gravityfill&pxc_bgtype=self&pxc_size=720,480&watermark=1452259361" },
                new Product { ID = 7, categoryID = 1, brand = "Ford", model = "Mondeo", year = 2012, salePrice = 65000, onSale = true, engineSize = 4000, img = "https://images.carexpert.com.au/vehicles/source-g/0/2/0291a291.jpg" },
                new Product { ID = 8, categoryID = 6, brand = "Toyota", model = "Corolla", year = 2013, salePrice = 65000, onSale = true, engineSize = 3000, img = "https://images.drive.com.au/driveau/image/private/c_fill,f_auto,g_auto,h_674,q_auto:eco,w_1200/ca-s3/2013/02/Toyota-Corolla01-625x332.jpg" },
                new Product { ID = 9, categoryID = 1, brand = "Mercedes", model = "E200", year = 2014, salePrice = 17000, onSale = true, engineSize = 2000, img = "https://carsales.pxcrush.net/car/spec/S00076ND.jpg?pxc_method=gravityfill&pxc_bgtype=self&pxc_size=440,292&watermark=1237207722" },
                new Product { ID = 10, categoryID = 1, brand = "BMW", model = "330i", year = 2015, salePrice = 9900, onSale = true, engineSize = 1600, img = "https://editorial.pxcrush.net/carsales/general/editorial/ge4720383834345735624.jpg?width=1024&height=683&aspect=pad" },
                new Product { ID = 11, categoryID = 6, brand = "Hyundai", model = "Getz", year = 2016, salePrice = 6000, onSale = false, engineSize = 1800, img = "https://upload.wikimedia.org/wikipedia/commons/2/28/Hyundai_Getz_-_Flickr_-_mick_-_Lumix.jpg" },
                new Product { ID = 12, categoryID = 4, brand = "Toyota", model = "Land-Cruiser", year = 2017, salePrice = 17500, onSale = true, engineSize = 1200, img = "https://images.hgmsites.net/hug/2017-toyota-land-cruiser_100565755_h.jpg" },
                new Product { ID = 13, categoryID = 1, brand = "BMW", model = "M series", year = 2018, salePrice = 125000, onSale = true, engineSize = 2400, img = "https://carsguide-res.cloudinary.com/image/upload/f_auto%2Cfl_lossy%2Cq_auto%2Ct_default/v1/editorial/2018-BMW-M3-Pure-Sedan-Grey-Dan-Pugh-1200x800p-13.jpg" },
                new Product { ID = 14, categoryID = 2, brand = "Land-Rover", model = "D150", year = 2019, salePrice = 25000, onSale = true, engineSize = 2000, img = "https://www.chasingcars.com.au/wp-content/uploads/2019/06/20MY-Evoque-D180-S-Narvik-Black-00001.jpg" },
                new Product { ID = 15, categoryID = 6, brand = "Hyundai", model = "Veloster", year = 2022, salePrice = 95000, onSale = false, engineSize = 1000, img = "https://www.cnet.com/a/img/resize/287dfaf309b3fed59f9933c8e5899620c56ea09d/hub/2022/04/19/8da47739-c866-4aff-9be9-1ba2d1b8f9d9/ogi-2022-hyundai-veloster-n-42.jpg?auto=webp&fit=crop&height=675&width=1200" },
                new Product { ID = 16, categoryID = 1, brand = "BMW", model = "7 series", year = 2011, salePrice = 95000, onSale = true, engineSize = 2000, img = "https://upload.wikimedia.org/wikipedia/commons/8/82/BMW_7er_M-Sportpaket_%28F01%29_%E2%80%93_Frontansicht%2C_7._Mai_2011%2C_D%C3%BCsseldorf.jpg" },
                new Product { ID = 17, categoryID = 2, brand = "Tata", model = "Nexon", year = 2020, salePrice = 17000, onSale = true, engineSize = 2000, img = "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202207/front-left-side-47-sixteen_nine.jpg" },
                new Product { ID = 18, categoryID = 6, brand = "Hyundai", model = "i30", year = 2013, salePrice = 28000, onSale = true, engineSize = 2600, img = "https://images.drive.com.au/caradvice/image/private/c_fill,f_auto,g_auto,h_674,q_auto:eco,w_1200/lbteiwwgbvsdgimpqtrx" },
                new Product { ID = 19, categoryID = 7, brand = "Porsche", model = "911", year = 2019, salePrice = 210000, onSale = true, engineSize = 3000, img = "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/2019-Porsche-911-Carrera-4S-Coupe-silver-press-image-1001x565p-%282%29.jpg" },
                new Product { ID = 20, categoryID = 1, brand = "BMW", model = "6 series", year = 2015, salePrice = 28000, onSale = false, engineSize = 1000, img = "https://carsguide-res.cloudinary.com/image/upload/f_auto%2Cfl_lossy%2Cq_auto%2Ct_default/v1/editorial/bmw-650i-gran-coupe-2015-%282%29.jpg" },
                new Product { ID = 21, categoryID = 1, brand = "BMW", model = "6 series", year = 2016, salePrice = 28000, onSale = false, engineSize = 2000, img = "https://m.atcdn.co.uk/vms/media/%7Bresize%7D/aa8b074dbe104b89b5288e6a0fb95802.jpg" },
                new Product { ID = 22, categoryID = 6, brand = "Mercedes", model = "B Class", year = 2018, salePrice = 28000, onSale = true, engineSize = 2700, img = "https://upload.wikimedia.org/wikipedia/commons/a/a9/Mercedes-Benz_W247_IMG_0398.jpg" },
                new Product { ID = 23, categoryID = 4, brand = "Toyota", model = "Prado", year = 2019, salePrice = 28000, onSale = true, engineSize = 2800, img = "https://www.tamworthcitytoyota.com.au/media-files/page-builder/content-pieces/6cd6d035-f70f-495c-aa4f-f2c620e1a0b0/image.jpg" },
                new Product { ID = 24, categoryID = 1, brand = "BMW", model = "330i", year = 2020, salePrice = 24000, onSale = true, engineSize = 2900, img = "https://www.autoguide.com/blog/wp-content/uploads/2020/01/2020-BMW-3-Series-330i-xDrive-review-11.jpg" },
                new Product { ID = 25, categoryID = 7, brand = "Ford", model = "Mustang Shelby", year = 2021, salePrice = 35000, onSale = true, engineSize = 3000, img = "https://hips.hearstapps.com/hmg-prod/images/2020-ford-mustang-shelby-gt500-563-1608256402.jpg?crop=0.627xw:0.468xh;0.321xw,0.480xh&resize=1200:*" },
                new Product { ID = 26, categoryID = 1, brand = "Ford", model = "Falcon", year = 1999, salePrice = 12400, onSale = true, engineSize = 2000, img = "https://i.ytimg.com/vi/EN4eHdPLkUY/maxresdefault.jpg" },
                new Product { ID = 27, categoryID = 3, brand = "Tata", model = "Xenon", year = 2011, salePrice = 13999, onSale = true, engineSize = 2000, img = "https://redbook.pxcrush.net/redbookcars/car/spec/tata0031.jpg?pxc_method=gravityfill&pxc_bgtype=self&pxc_size=900%2C600" },
                new Product { ID = 28, categoryID = 6, brand = "Hyundai", model = "Veloster", year = 2012, salePrice = 12455, onSale = true, engineSize = 3000, img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShRlZaZCO9n2kGG4bUwiI2M1aDJUVi7z5QWie3k_BgyHd2wyLJ7SPgprwzZ58PT_EtdBE&usqp=CAU" },
                new Product { ID = 29, categoryID = 1, brand = "BMW", model = "330d", year = 2013, salePrice = 99999, onSale = true, engineSize = 3000, img = "https://media.evo.co.uk/image/private/s--sPrxQJps--/v1556226942/evo/images/dir_1141/car_photo_570568.jpg" },
                new Product { ID = 30, categoryID = 2, brand = "Ford", model = "Kuga", year = 2014, salePrice = 12555, onSale = true, engineSize = 2000, img = "https://i.ytimg.com/vi/6qFDLaH5Qy0/maxresdefault.jpg" },
                new Product { ID = 31, categoryID = 1, brand = "Ford", model = "Mondeo", year = 2015, salePrice = 12555, onSale = true, engineSize = 3000, img = "https://editorial.pxcrush.net/carsales/general/editorial/ge5070138177763171076.jpg?width=1024&height=683&aspect=pad" },
                new Product { ID = 32, categoryID = 1, brand = "Ford", model = "Mondeo", year = 2016, salePrice = 102222, onSale = true, engineSize = 2000, img = "https://editorial.pxcrush.net/carsales/general/editorial/ford-mondeo-031.jpg?width=1024&height=683&aspect=pad" },
                new Product { ID = 33, categoryID = 1, brand = "Toyota", model = "Camry", year = 2018, salePrice = 12555, onSale = true, engineSize = 2000, img = "https://assets.whichcar.com.au/image/upload/s--MZIGcG3i--/ar_1.4583333333333333,c_fill,f_auto,q_auto:good/v1/archive/whichcar/2018/01/15/-1/Toyota-Camry-Ascent-Hybrid-cover-MAIN.jpg" });
        }
    }
}
