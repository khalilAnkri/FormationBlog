"use client";

import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "white", py: 4, mt: 6 }}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {/* Company Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">MyBrand</Typography>
            <Typography variant="body2">Helping businesses grow with innovative solutions.</Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">Quick Links</Typography>
            <Typography variant="body2">About Us</Typography>
            <Typography variant="body2">Contact</Typography>
            <Typography variant="body2">Support</Typography>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">Follow Us</Typography>
            <Box sx={{ mt: 1 }}>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
