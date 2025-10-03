from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Go to the home page and take an immediate screenshot for debugging
    page.goto("http://localhost:5173/")
    page.screenshot(path="jules-scratch/verification/00-debug-home.png")

    # Now, try to find the element
    expect(page.get_by_role("heading", name="Bem-vindo!")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/01-home.png")

    # Go to Clientes page
    page.get_by_role("link", name="Cliente").click()
    expect(page.get_by_role("heading", name="Gestão de Clientes")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/02-clientes.png")

    # Go to Fornecedores page
    page.get_by_role("link", name="Fornecedor").click()
    expect(page.get_by_role("heading", name="Gestão de Fornecedores")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/03-fornecedores.png")

    # Go to Cadastrar Colaborador page
    page.get_by_role("link", name="Cadastrar Colaborador").click()
    expect(page.get_by_role("heading", name="Gestão de Colaboradores")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/04-colaboradores.png")

    # Go to Contratos page
    page.get_by_role("link", name="Contrato").click()
    expect(page.get_by_role("heading", name="Gestão de Contratos")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/05-contratos.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)