
const playwright = require('playwright');
const { test, expect } = require('@playwright/test');

(async () => {
    try{
    //open Shoestore site
    const browser = await playwright.chromium.launch({
          headless: false,
          
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    // Go to https://rb-shoe-store.herokuapp.com/
    await page.goto('https://rb-shoe-store.herokuapp.com/');

    // Click [placeholder="Email Address"]
    await page.click('[placeholder="Email Address"]');

    // Click input[type="submit"]
    await page.click('input[type="submit"]');
    expect(page.url()).toBe('https://rb-shoe-store.herokuapp.com/');

    let content = await page.innerText('div.flash');
    expect(content).toBe("Please enter an email address");
    
    

    await page.screenshot({ path: 'blank_email.png' });

    // Click [placeholder="Email Address"]
    await page.click('[placeholder="Email Address"]');

    // Fill [placeholder="Email Address"]
    await page.fill('[placeholder="Email Address"]', 'test');

    // Click input[type="submit"]
    await page.click('input[type="submit"]');
    expect(page.url()).toBe('https://rb-shoe-store.herokuapp.com/');

    content = await page.innerText('div.flash');
    expect(content).toBe("Invalid email format. Ex. name@example.com");

    await page.screenshot({ path: 'invalid_email.png' });

    // Click [placeholder="Email Address"]
    await page.click('[placeholder="Email Address"]');

    // Fill [placeholder="Email Address"]
    await page.fill('[placeholder="Email Address"]', 'test@abc.com');

    // Click input[type="submit"]
    await page.click('input[type="submit"]');
    
    content = await page.innerText('div.flash');
    expect(content).toBe("Thanks! We will notify you of our new shoes at this email: test@abc.com");    

    await page.screenshot({ path: 'valid_email.png' });
    
     // Click input[name="promo_code"]
    await page.click('input[name="promo_code"]');
    await page.click('#promo_code_submit');
    expect(page.url()).toBe('https://rb-shoe-store.herokuapp.com/');

    content = await page.innerText('div.flash');
    expect(content).toBe("Please enter a promotional code");  

    // Click input[name="promo_code"]
    await page.click('input[name="promo_code"]');
    // Fill input[name="promo_code"]
    await page.fill('input[name="promo_code"]', 'test');
    // Click #promo_code_submit
    await page.click('#promo_code_submit');
    expect(page.url()).toBe('https://rb-shoe-store.herokuapp.com/');

    content = await page.innerText('div.flash');
    expect(content).toBe("Invalid code format");  

    await page.screenshot({ path: 'invalid_promo.png' });

    // Click text=Search
    await page.click('text=Search');
    expect(page.url()).toBe('https://rb-shoe-store.herokuapp.com/');

    content = await page.innerText('div.flash');
    expect(content).toBe("Please Select a Brand");  

    await page.screenshot({ path: 'blank_brand.png' });

    // Go to https://rb-shoe-store.herokuapp.com/brands/Acorn
    await page.goto('https://rb-shoe-store.herokuapp.com/brands/Acorn');

    content = await page.innerText('div.title');
    expect(content).toBe("Acorn's Shoes");  

    await page.screenshot({ path: 'Acorn_Shoes.png' });

    // Click text=Home
    await page.click('text=Home');
    expect(page.url()).toBe('https://rb-shoe-store.herokuapp.com/');
    // Select Valentino
    await page.selectOption('select[name="brand"]', 'Valentino');
    // Click text=Search
    await page.click('text=Search');
    expect(page.url()).toBe('https://rb-shoe-store.herokuapp.com/brands/Valentino');

    content = await page.innerText('div.title');
    expect(content).toBe("Valentino's Shoes");

    await page.screenshot({ path: 'Valentino_Shoes.png' });

    // Click text=January
    await Promise.all([
        page.click('text=January'),
        page.waitForNavigation(/*{ url: 'https://rb-shoe-store.herokuapp.com/months/january' }*/)
    ]);

    content = await page.innerText('div.title');
    expect(content).toBe("January's Shoes");

    await page.screenshot({ path: 'January_Shoes.png' });

     // Click text=December
    await page.click('text=December');
    expect(page.url()).toBe('https://rb-shoe-store.herokuapp.com/months/december');

    content = await page.innerText('div.title');
    expect(content).toBe("December's Shoes");
    
    await page.screenshot({ path: 'December_Shoes.png' });

    browser.close();
    }
    catch(e){
       console.log("error occurred"+e);         
    }

})();
