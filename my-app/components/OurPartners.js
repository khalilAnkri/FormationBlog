import { Box, Typography, Container, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import { useTheme } from "@emotion/react";

export default function OurPartners() {
  const partnerLogos = [
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
  ];

  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor:theme.palette.primary.paper , py: 6 }}>
      <Container>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
        Our <span style={{ color: theme.palette.secondary.main }}>Partners</span>
      </Typography>

        <Box sx={{ position: "relative" }}>
          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={5}
            spaceBetween={40}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 2 },
              600: { slidesPerView: 3 },
              960: { slidesPerView: 5 },
            }}
            style={{ display: "flex", alignItems: "center" }}
          >
            {partnerLogos.map((logo, index) => (
              <SwiperSlide key={index}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src={logo}
                    alt={`Partner Logo ${index + 1}`}
                    width={120}
                    height={60}
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <IconButton className="swiper-button-prev" sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", color: theme.palette.primary.main }}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton className="swiper-button-next" sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", color: theme.palette.primary.main }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
