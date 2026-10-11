import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { CartProvider, WishlistProvider } from "@/lib/store";

const HomePage = lazy(() => import("@/app/page"));
const AboutPage = lazy(() => import("@/app/about/page"));
const CartPage = lazy(() => import("@/app/cart/page"));
const CheckoutPage = lazy(() => import("@/app/checkout/page"));
const CheckoutSuccessPage = lazy(() => import("@/app/checkout/success/page"));
const ContactPage = lazy(() => import("@/app/contact/page"));
const JournalPage = lazy(() => import("@/app/journal/page"));
const PrivacyPolicyPage = lazy(() => import("@/app/privacy-policy/page"));
const ReturnsPolicyPage = lazy(() => import("@/app/returns-refund-warranty-policy/page"));
const ShippingPolicyPage = lazy(() => import("@/app/shipping-policy/page"));
const ShopPage = lazy(() => import("@/app/shop/page"));
const TermsPage = lazy(() => import("@/app/terms-and-conditions/page"));
const TrackOrderPage = lazy(() => import("@/app/track-order/page"));
const WishlistPage = lazy(() => import("@/app/wishlist/page"));
const ProductRoute = lazy(() => import("@/vite/routes/ProductRoute"));
const CategoryRoute = lazy(() => import("@/vite/routes/CategoryRoute"));
const NotFoundPage = lazy(() => import("@/app/not-found"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function RouteFallback() {
  return (
    <div className="container-x grid min-h-[45vh] place-items-center py-16" aria-label="Loading page">
      <span className="text-sm text-mute">One moment…</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          <SiteHeader />
          <main className="flex-1">
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/category/:slug" element={<CategoryRoute />} />
                <Route path="/product/:slug" element={<ProductRoute />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/returns-refund-warranty-policy" element={<ReturnsPolicyPage />} />
                <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsPage />} />
                <Route path="/track-order" element={<TrackOrderPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <SiteFooter />
          <WhatsAppFloat />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
