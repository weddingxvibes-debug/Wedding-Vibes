export default function Head() {
  return (
    <>
      {/* Basic Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Business Information */}
      <meta name="business:contact_data:street_address" content="Betul, Madhya Pradesh, India" />
      <meta name="business:contact_data:locality" content="Betul" />
      <meta name="business:contact_data:region" content="Madhya Pradesh" />
      <meta name="business:contact_data:postal_code" content="460001" />
      <meta name="business:contact_data:country_name" content="India" />
      <meta name="business:contact_data:phone_number" content="+91-9425383179" />
      <meta name="business:contact_data:email" content="priyanshu@weddingvibes.com" />
      <meta name="business:contact_data:website" content="https://weddingvibes.com" />
      
      {/* Geographic Tags */}
      <meta name="geo.region" content="IN-MP" />
      <meta name="geo.placename" content="Betul, Madhya Pradesh" />
      <meta name="geo.position" content="21.9081;77.9036" />
      <meta name="ICBM" content="21.9081, 77.9036" />
      
      {/* Service Area */}
      <meta name="service-area" content="Betul, Bhopal, Jabalpur, Indore, Nagpur, Raipur, Madhya Pradesh, India" />
      
      {/* Professional Tags */}
      <meta name="profession" content="Wedding Photographer" />
      <meta name="experience" content="8+ Years" />
      <meta name="specialization" content="Indian Wedding Photography, Pre-wedding Shoots, Event Photography" />
      
      {/* Contact Information */}
      <meta name="contact:phone" content="+91-9425383179" />
      <meta name="contact:email" content="priyanshu@weddingvibes.com" />
      <meta name="contact:address" content="Betul, Madhya Pradesh, India" />
      
      {/* Social Media */}
      <meta name="instagram" content="@wedding_vibes_rp" />
      <meta name="social:instagram" content="https://instagram.com/wedding_vibes_rp" />
      <meta name="social:facebook" content="https://facebook.com/wedding_vibes_rp" />
      <meta name="social:youtube" content="https://youtube.com/@wedding_vibes_rp" />
      
      {/* Business Hours */}
      <meta name="business:hours:monday" content="09:00-20:00" />
      <meta name="business:hours:tuesday" content="09:00-20:00" />
      <meta name="business:hours:wednesday" content="09:00-20:00" />
      <meta name="business:hours:thursday" content="09:00-20:00" />
      <meta name="business:hours:friday" content="09:00-20:00" />
      <meta name="business:hours:saturday" content="09:00-20:00" />
      <meta name="business:hours:sunday" content="10:00-18:00" />
      
      {/* Service Tags */}
      <meta name="services" content="Wedding Photography, Pre-wedding Shoots, Engagement Photography, Bridal Photography, Event Photography, Corporate Photography, Family Photography, Portrait Photography, Maternity Photography, Baby Photography, Birthday Photography, Anniversary Photography, Festival Photography, Candid Photography, Traditional Photography, Destination Wedding Photography" />
      
      {/* Equipment Tags */}
      <meta name="equipment" content="DSLR Camera, Mirrorless Camera, Professional Lighting, Drone Photography, Video Equipment, Photo Editing Software" />
      
      {/* Style Tags */}
      <meta name="photography-style" content="Candid, Traditional, Contemporary, Artistic, Documentary, Cinematic, Natural, Creative" />
      
      {/* Language Tags */}
      <meta name="language" content="Hindi, English" />
      <meta httpEquiv="content-language" content="hi-IN, en-IN" />
      
      {/* Price Range */}
      <meta name="price-range" content="₹20,000 - ₹2,00,000" />
      <meta name="currency" content="INR" />
      
      {/* Availability */}
      <meta name="availability" content="Available for bookings" />
      <meta name="booking-advance" content="2-6 months recommended" />
      
      {/* Quality Tags */}
      <meta name="quality" content="Professional, High-Resolution, Edited, Print-Ready" />
      <meta name="delivery" content="Digital Gallery, USB Drive, Prints Available" />
      <meta name="turnaround" content="2-4 weeks for full gallery" />
      
      {/* Local SEO */}
      <meta name="local-business" content="Photography Studio" />
      <meta name="service-radius" content="500km from Betul" />
      <meta name="travel" content="Available for destination weddings" />
      
      {/* Review Tags */}
      <meta name="rating" content="4.9/5" />
      <meta name="reviews" content="500+ Happy Clients" />
      <meta name="testimonials" content="Excellent wedding photography services" />
      
      {/* Certification */}
      <meta name="certification" content="Professional Wedding Photographer" />
      <meta name="insurance" content="Equipment Insured" />
      
      {/* Seasonal Tags */}
      <meta name="wedding-season" content="October to March peak season" />
      <meta name="availability-months" content="Year-round availability" />
      
      {/* Package Information */}
      <meta name="packages" content="Basic, Premium, Luxury Wedding Packages" />
      <meta name="inclusions" content="Photography, Videography, Editing, Album Design" />
      
      {/* Technology Tags */}
      <meta name="editing-software" content="Adobe Lightroom, Photoshop, Premiere Pro" />
      <meta name="backup" content="Multiple backup systems" />
      
      {/* Event Types */}
      <meta name="event-types" content="Hindu Weddings, Sikh Weddings, Christian Weddings, Muslim Weddings, Destination Weddings, Court Marriages, Reception Parties, Engagement Ceremonies, Mehendi Ceremonies, Haldi Ceremonies, Sangeet Ceremonies, Ring Ceremonies, Roka Ceremonies" />
      
      {/* Additional Services */}
      <meta name="additional-services" content="Photo Booth, Live Streaming, Same Day Edit, Drone Coverage, Candid Photography, Traditional Photography, Album Design, Photo Printing, Digital Gallery" />
      
      {/* Target Audience */}
      <meta name="target-audience" content="Couples, Families, Event Organizers, Wedding Planners" />
      
      {/* Unique Selling Points */}
      <meta name="usp" content="8+ Years Experience, 500+ Happy Couples, Professional Equipment, Quick Delivery, Affordable Pricing, Creative Photography" />
      
      {/* Schema.org structured data would go here */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Wedding Vibes Photography",
            "image": "https://weddingvibes.com/logo.jpg",
            "description": "Professional wedding photographer in Betul, Madhya Pradesh specializing in Indian weddings, pre-wedding shoots, and events.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Betul",
              "addressLocality": "Betul",
              "addressRegion": "Madhya Pradesh",
              "postalCode": "460001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 21.9081,
              "longitude": 77.9036
            },
            "telephone": "+91-9425383179",
            "email": "priyanshu@weddingvibes.com",
            "url": "https://weddingvibes.com",
            "sameAs": [
              "https://instagram.com/wedding_vibes_rp",
              "https://facebook.com/wedding_vibes_rp",
              "https://youtube.com/@wedding_vibes_rp"
            ],
            "openingHours": "Mo-Sa 09:00-20:00, Su 10:00-18:00",
            "priceRange": "₹₹₹",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500"
            },
            "founder": {
              "@type": "Person",
              "name": "Priyanshu Malviya"
            },
            "areaServed": [
              "Betul",
              "Madhya Pradesh",
              "Bhopal",
              "Jabalpur",
              "Indore",
              "India"
            ],
            "serviceType": [
              "Wedding Photography",
              "Pre-wedding Photography",
              "Event Photography",
              "Portrait Photography"
            ]
          })
        }}
      />
    </>\n  )\n}