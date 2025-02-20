"use client";

import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";  
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "../components/Footer";
import Link from "next/link";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import OurPartners from "@/components/OurPartners";

export default function LandingPage() {
  const theme = useTheme();  

  return (
    <div>
  
  <Box
      sx={{
        height: "62vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        p: 4,
        background: `linear-gradient(135deg, ${theme.palette.primary.second}, ${theme.palette.secondary.main})`,
      }}
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".custom-pagination",  
        }}
        autoplay={{ delay: 3000 }}
        style={{
          width: "100%",
          maxWidth: "600px",
          position: "relative",  
        }}
      >
        <SwiperSlide>
          <Typography variant="h3" fontWeight="bold">
            Welcome to <span>   <Image
              src="/logo.png"
              alt="Product Image"
              width={220}  
              height={45} 
              style={{ borderRadius: "8px", objectFit: "cover" }} 
            /></span>
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            The best solution to elevate your business.
          </Typography>
        </SwiperSlide>
        <SwiperSlide>
          <Typography variant="h3" fontWeight="bold">
            Build with Confidence
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Our expertise helps you grow and scale.
          </Typography>
        </SwiperSlide>
        <SwiperSlide>
          <Typography variant="h3" fontWeight="bold">
            Join Us Today
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Start your journey to success with Novelis.
          </Typography>
        </SwiperSlide>
      </Swiper>

      
      <Box
        className="custom-pagination"
        sx={{
          mt: 2,
          mb: 4,
          gap: 1,  
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Link href="/connexion" passHref>
      <Button
        variant="contained"
        sx={{ mt: 3, bgcolor: theme.palette.secondary.main }}
        endIcon={<ArrowForwardIcon />}
      >
        Get Started
      </Button></Link>
    </Box>

    <Container sx={{ py: 8 }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
        Our <span style={{ color: theme.palette.secondary.main }}>Products</span>
      </Typography>

      <Grid container spacing={4} justifyContent="center">
      {[
        {
          imageUrl: "/novy.png", 
          description:
            "Novy POM is a business solution that enables the intelligent and automatic processing of supplier invoices and customer purchase orders, optimizing their management throughout the entire chain.",
        },
        {
          imageUrl: "/smartroby.png",  
          description:
            "SmartRoby is a solution that supports all RPA stakeholders in their automation journey and streamlines RPA operations by facilitating impact assessment and process execution management.",
        },
        {
          imageUrl: "/logo.png",  
          description:
            "eSummarize is an innovative solution for quickly producing accurate and concise summaries from unstructured texts and lengthy documents. Leveraging generative AI algorithms, eSummarize extracts all essential information from your documents to provide high-quality summaries in just one click.",
        },
      ].map((product, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              src={product.imageUrl}
              alt="Product Image"
              width={200}  
              height={45} 
              style={{ borderRadius: "8px", objectFit: "cover" }} 
            />
            <Typography variant="body1" sx={{ flexGrow: 1, mt: 2 }}>
              {product.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
    </Container>

 
       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 6, px: 2 }}>
       
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
        About <span style={{ color: theme.palette.secondary.main }}>Us</span>
      </Typography>

      <Paper
        elevation={4}
        sx={{
          maxWidth: 800,
          p: 4,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "white",
        }}
      >
        <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
          Chez Novelis, nous sommes spécialisés dans l'offre de solutions et de services complets qui combinent de 
          manière transparente notre expertise en matière de processus avec le Process Intelligence, l'automatisation 
          intelligente, les avancées en matière d'IA, les architectures innovantes et la cybersécurité.
          <br /><br />
          Cette fusion des capacités nous permet de fournir des solutions qui non seulement exploitent les technologies 
          de pointe, mais s'appuient également sur notre compréhension approfondie des processus.
          <br /><br />
          Nous vous accompagnons ainsi à améliorer votre efficacité opérationnelle, être plus compétitive et générer 
          plus de revenus grâce à notre expertise technologique de pointe.
          <br /><br />
          Novelis rassemble aujourd'hui plus de <b>150 collaborateurs</b> et accompagne plus de <b>50 clients 
          internationaux</b>.
        </Typography>

 
        <Link href="/connexion" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: "white",
              px: 4, 
              py: 1.5,
              borderRadius: 2,  
              fontSize: "1rem",
              "&:hover": { backgroundColor: theme.palette.secondary.dark }, 
            }}
          >
            Sign Up Now
          </Button>
        </Link>
      </Paper>
    </Box>

            
          
       <OurPartners/>   
      <Footer />
    </div>
  );
}
