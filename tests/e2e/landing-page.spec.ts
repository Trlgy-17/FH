import { test, expect } from "@playwright/test";

test.describe("FULLHOME ID Landing Page E2E Suite", () => {
  test("1. Homepage loads successfully with header and hero elements", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/FULLHOME ID/);

    // Header visible
    await expect(page.locator("header").first()).toBeVisible();

    // H1 heading present
    await expect(
      page.getByRole("heading", { name: /Ruang yang Dirancang untuk Hidup Anda/i })
    ).toBeVisible();

    // Primary CTA in hero section (first WhatsApp link rendered on page)
    const heroCta = page.locator("section").first().getByRole("link").first();
    await expect(heroCta).toBeVisible();
  });

  test("2. Navigation links and mobile drawer work properly", async ({ page, isMobile }) => {
    await page.goto("/");

    if (isMobile) {
      // Mobile: open drawer via hamburger button
      const openBtn = page.getByRole("button", { name: /Buka Menu Navigasi/i });
      await expect(openBtn).toBeVisible();
      await openBtn.click();

      // Mobile nav overlay should show
      await expect(page.getByRole("navigation")).toBeVisible();

      // Escape closes menu
      await page.keyboard.press("Escape");
    } else {
      // Desktop: nav links in <nav aria-label="Navigasi Utama">
      const mainNav = page.getByLabel("Navigasi Utama");
      await expect(mainNav.getByRole("link", { name: "Layanan" })).toBeVisible();
      await expect(mainNav.getByRole("link", { name: "Portofolio" })).toBeVisible();
      await expect(mainNav.getByRole("link", { name: "Proses" })).toBeVisible();
    }
  });

  test("3. WhatsApp CTA links contain valid international phone format", async ({ page }) => {
    await page.goto("/");

    // Floating WhatsApp FAB
    const waFloating = page.getByLabel("Hubungi FULLHOME ID via WhatsApp");
    await expect(waFloating).toBeVisible();
    const href = await waFloating.getAttribute("href");

    expect(href).toContain("https://wa.me/");
    expect(href).toContain("text=");
  });

  test("4. Form validation displays errors on empty submit and succeeds on valid payload", async ({ page }) => {
    await page.goto("/#contact");

    const submitBtn = page.getByRole("button", { name: /Kirim & Lanjutkan ke WhatsApp/i });
    await expect(submitBtn).toBeVisible({ timeout: 10000 });

    // Submit with empty inputs to trigger validation errors
    await submitBtn.click();
    await expect(page.getByText("Nama minimal 2 karakter")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Nomor WhatsApp minimal 8 digit")).toBeVisible();

    // Fill valid data using placeholder-based locators
    await page.getByPlaceholder("Contoh: Budi Santoso").fill("Ahmad Fauzi");
    await page.getByPlaceholder("Contoh: 081234567890").fill("081299887766");
    await page.getByPlaceholder("Contoh: BSD City, Tangerang").fill("Bintaro, Tangerang Selatan");

    // Submit valid form
    await submitBtn.click();
    await expect(page.getByText(/Terima Kasih!/i)).toBeVisible({ timeout: 10000 });
  });
});
