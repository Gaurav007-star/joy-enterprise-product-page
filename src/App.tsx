import { useEffect, useState } from "react";
import { ArrowRight, Phone, Search, ShoppingCart, X } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PRODUCTS, type Product } from "@/data/products";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NAV_LINKS = ["Home"];

const PRODUCTS_PER_PAGE = 8;

function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const items: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push("ellipsis");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("ellipsis");
  items.push(total);
  return items;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full !gap-0 !p-0">
      <div className="relative overflow-hidden bg-black">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-lg leading-snug font-bold tracking-wider text-foreground">
          {product.name}
        </h3>
      </div>

      <div className="border-t p-4 pt-1">
        <Dialog>
          <DialogTrigger
            render={
              <Button type="button" className="w-full rounded-full" size="lg" />
            }
          >
            <ShoppingCart data-icon="inline-start" className="size-4" />
            Buy
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm overflow-hidden p-0">
            <div className="relative flex flex-col items-center text-center">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 size-8 rounded-full text-white hover:bg-white hover:text-black"
                  />
                }
              >
                <X className="size-4" />
              </DialogClose>

              <div className="flex h-20 w-full items-center justify-center bg-primary">
                <div className="grid size-14 place-items-center rounded-full bg-white/15">
                  <ShoppingCart className="size-7 text-white" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 px-6 pt-5 pb-6">
                <DialogTitle className="text-xl">Order this</DialogTitle>
                <DialogDescription>
                  Call or WhatsApp us to place your order for{" "}
                  <span className="font-medium text-foreground">
                    {product.name}
                  </span>
                  .
                </DialogDescription>

                <span
                  // href="tel:+919763404683"
                  className="mt-4 inline-flex cursor-text items-center justify-center gap-2 rounded-full border bg-background px-5 py-2.5 text-sm font-semibold shadow-xs select-text transition-colors hover:bg-muted"
                >
                  <Phone className="size-4 shrink-0 text-primary" />
                  <span>+91 97634 04683</span>
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}

function CategoryHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center pointer-events-none ">
      <motion.div
        className={cn(
          "relative flex items-center justify-between pointer-events-auto",
          scrolled
            ? "rounded-lg! bg-primary/80 dark:bg-[#1e2429]/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border border-black/[0.06] dark:border-white/[0.08]"
            : "bg-primary dark:bg-[#1e2429] rounded-lg! mt-2!",
        )}
        initial={false}
        animate={
          scrolled
            ? {
                maxWidth: "820px",
                width: "92%",
                borderRadius: 9999,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 14,
              }
            : {
                maxWidth: "1152px",
                width: "100%",
                borderRadius: 0,
                paddingTop: 14,
                paddingBottom: 14,
                paddingLeft: 32,
                paddingRight: 32,
                marginTop: 0,
              }
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label="Joy Enterprise brand home"
          className="flex select-none items-center gap-2.5"
        >
          {/* <motion.span
            className="grid place-items-center text-[10px] font-black text-white bg-secondary shrink-0 tracking-wide"
            style={{
              boxShadow:
                "0 2px 8px rgba(4,123,213,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            animate={{
              width: scrolled ? 30 : 34,
              height: scrolled ? 30 : 34,
              borderRadius: scrolled ? 10 : 12,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            JE
          </motion.span> */}
          <motion.span
            className="font-semibold tracking-wider text-white"
            animate={{ fontSize: scrolled ? "14px" : "16px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Joy Enterprise
          </motion.span>
        </a>

        {/* Nav links */}
        <nav
          aria-label="Main navigation"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-0.5"
        >
          {NAV_LINKS.map((link) => {
            const isActive = link === "Home";
            return (
              <Button
                key={link}
                type="button"
                variant="ghost"
                className={cn(
                  "h-8 rounded-full px-3.5 text-[13px] font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/15 text-white dark:text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link}
              </Button>
            );
          })}
        </nav>

        <Dialog>
          <DialogTrigger
            render={
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-full font-semibold text-[13px] px-4 h-8 border-0 transition-all duration-200 hover:brightness-105 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm"
              />
            }
          >
            Contact
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm p-0 overflow-hidden">
            <div className="relative flex flex-col items-center text-center">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 size-8 rounded-full text-white hover:bg-white hover:text-black"
                  />
                }
              >
                <X className="size-4" />
              </DialogClose>

              <div className="flex h-20 w-full items-center justify-center bg-primary">
                <div className="grid size-14 place-items-center rounded-full bg-white/15">
                  <Phone className="size-7 text-white" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 px-6 pt-5 pb-6">
                <DialogTitle className="text-xl">Contact Us</DialogTitle>
                <DialogDescription>
                  We're happy to help. Reach us on phone or WhatsApp.
                </DialogDescription>

                <span
                  // href="tel:+919763404683"
                  className="mt-4 inline-flex cursor-text items-center justify-center gap-2 rounded-full border bg-background px-5 py-2.5 text-sm font-semibold shadow-xs select-text transition-colors hover:bg-muted"
                >
                  <Phone className="size-4 shrink-0 text-primary" />
                  <span>+91 97634 04683</span>
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}

function FilterBar({
  value,
  onValueChange,
  count,
}: {
  value: string;
  onValueChange: (value: string) => void;
  count: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-semibold tracking-wider">All Products</h1>
        <Badge className="!mt-1 !h-auto rounded-full px-2.5 py-1 text-xs">
          {count} {count === 1 ? "product" : "products"}
        </Badge>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-primary/60" />
        <Input
          placeholder="Search products…"
          aria-label="Search products"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="!h-10 !rounded-full !border-primary/40 !bg-background !pl-11 pr-12 shadow-xs focus-visible:!border-primary focus-visible:!ring-primary/15"
        />
        <Button
          type="button"
          size="icon"
          aria-label="Submit search"
          className="absolute top-1 right-1 size-8 rounded-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function PromoBanner() {
  return (
    <section
      aria-label="Promotion"
      className="mt-5 relative overflow-hidden rounded-3xl border min-h-[320px] sm:min-h-[360px]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1644150258801-8631588f0523?q=80&w=1134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col items-start justify-center gap-3 px-6 py-12 sm:px-10 sm:py-14 h-full min-h-[320px] sm:min-h-[360px]">
        <span className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
          Limited time offer
        </span>
        <h2 className="text-2xl leading-tight font-semibold tracking-wider text-white sm:text-3xl">
          New season edits.
          <br />
          Up to 40% off.
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-white/70">
          From crunchy chanachur and nimki to pickle, chire bhaja, and
          freshly-ground garam masala — your daily essentials, in stock and
          ready to go.
        </p>
      </div>
    </section>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section aria-label="Product listing">
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}

function PaginationBar({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const goTo = (next: number) =>
    onPageChange(Math.min(totalPages, Math.max(1, next)));

  return (
    <nav
      aria-label="pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <PaginationPrevious
        href="#"
        text="Previous"
        onClick={(event) => {
          event.preventDefault();
          goTo(page - 1);
        }}
        aria-disabled={page === 1}
        className={`rounded-full! border-border! bg-background! text-foreground! hover:bg-muted! hover:text-foreground! ${page === 1 ? "pointer-events-none opacity-45" : ""}`}
      />
      <PaginationContent>
        {getPageItems(page, totalPages).map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={item === page}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(item);
                }}
                className={
                  item === page
                    ? "bg-primary! text-primary-foreground! border-primary! hover:bg-primary/90!"
                    : "border-transparent! bg-transparent! text-foreground hover:bg-muted!"
                }
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
      </PaginationContent>
      <PaginationNext
        href="#"
        text="Next"
        onClick={(event) => {
          event.preventDefault();
          goTo(page + 1);
        }}
        aria-disabled={page === totalPages}
        className={`rounded-full! border-border! bg-background! text-foreground! hover:bg-muted! hover:text-foreground! ${page === totalPages ? "pointer-events-none opacity-45" : ""}`}
      />
    </nav>
  );
}

function PageFooter() {
  return (
    <footer className="mt-16 bg-foreground text-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              {/* <div
                className="grid size-7 shrink-0 place-items-center rounded-lg bg-secondary text-[10px] font-black tracking-wide text-red-500"
                style={{
                  boxShadow:
                    "0 2px 8px rgba(4,123,213,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                JE
              </div> */}
              <span className="text-lg font-semibold tracking-wider text-background">
                Joy Enterprise
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-background/55">
              Your trusted local grocery store — stocking fresh daily essentials
              like chanachur, chire bhaja, bori, nimki, pickles, and spices for
              every home.
            </p>
            {/* <div className="space-y-1.5" aria-hidden>
              <div className="h-1.5 w-4/5 rounded-sm bg-background/25" />
              <div className="h-1.5 w-3/5 rounded-sm bg-background/25" />
            </div> */}
          </div>

          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <a
              href="tel:+919763404683"
              className="mt-3 flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-background"
            >
              +91 97634 04683
            </a>
          </div>
        </div>

        <Separator className="my-8 bg-background/15" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-background/55">
          <p>© 2026 Brand placeholder. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-6">
            <a href="#" className="transition-colors hover:text-background">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-background">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-background">
              Cookie Settings
            </a>
            <a href="#" className="transition-colors hover:text-background">
              Accessibility
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );
  const pageProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CategoryHeader />

      <main className="mx-auto w-full max-w-6xl">
        <PromoBanner />

        <div className="mt-12 mb-8">
          <FilterBar
            value={search}
            onValueChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            count={filteredProducts.length}
          />
        </div>
        <ProductGrid products={pageProducts} />
        <PaginationBar
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>

      <PageFooter />
    </div>
  );
}

export default App;
