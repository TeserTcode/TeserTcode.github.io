import math

MAXN = 10000

# ---------- basic helpers ----------

def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

def prime_index(n):
    if not is_prime(n):
        return None
    count = 0
    for i in range(2, n + 1):
        if is_prime(i):
            count += 1
    return count

def is_perfect_power(n):
    if n < 2:
        return False
    for b in range(2, int(math.log2(n)) + 2):
        a = round(n ** (1 / b))
        if a ** b == n and a > 1:
            return (a, b)
    return False

def is_fibonacci(n):
    def is_square(x):
        return int(math.isqrt(x)) ** 2 == x
    return is_square(5*n*n + 4) or is_square(5*n*n - 4)

def is_lucas(n):
    a, b = 2, 1
    while a <= n:
        if a == n:
            return True
        a, b = b, a + b
    return False

def is_happy(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d)**2 for d in str(n))
    return n == 1

def is_harshad(n):
    if n == 0:
        return False
    return n % sum(int(d) for d in str(n)) == 0

def is_repunit(n):
    return set(str(n)) == {'1'}

def is_repdigit(n):
    return len(set(str(n))) == 1

def is_semiprime(n):
    count = 0
    temp = n
    for p in range(2, int(math.sqrt(n)) + 1):
        while temp % p == 0:
            count += 1
            temp //= p
        if count > 2:
            return False
    if temp > 1:
        count += 1
    return count == 2

def evil_odious_pernicious(n):
    b = bin(n).count("1")
    if b % 2 == 0:
        return "evil"
    if is_prime(b):
        return "pernicious"
    return "odious"

# ---------- special numbers ----------

SPECIAL = {
    0: ("Additive identity", "Neutral element of addition."),
    1: ("Multiplicative identity", "Unit of multiplication."),
    2: ("Even prime", "The only prime that is even."),
    1729: ("Ramanujan number", "Smallest number expressible as sum of two cubes in two ways."),
    5040: ("Plato's number", "Highly composite; 7!"),
}

# ---------- HTML generation ----------

html = []
html.append("""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Every Number is Special</title>
<style>
body { font-family: sans-serif; line-height: 1.5; }
input { font-size: 18px; width: 300px; }
.number { margin-bottom: 40px; }
</style>
<script>
function search() {
  let q = document.getElementById("search").value;
  document.querySelectorAll(".number").forEach(d => {
    d.style.display = d.id.includes("n-" + q) ? "block" : "none";
  });
}
</script>
</head>
<body>

<h1>Every Number Is Special</h1>
<input id="search" onkeyup="search()" placeholder="Search number...">
<hr>
""")

for n in range(MAXN + 1):
    html.append(f'<div class="number" id="n-{n}">')
    html.append(f"<h1>{n}</h1>")

    if is_prime(n):
        idx = prime_index(n)
        html.append("<h2>Prime number</h2>")
        html.append("<p>A number divisible only by 1 and itself.</p>")
        html.append(f"<p><b>Notes:</b> This is the {idx}ᵗʰ prime.</p>")

    pp = is_perfect_power(n)
    if pp:
        a, b = pp
        html.append("<h2>Perfect power</h2>")
        html.append(f"<p>{n} = {a}^{b}</p>")

    if is_fibonacci(n):
        html.append("<h2>Fibonacci number</h2>")
        html.append("<p>Appears in the Fibonacci sequence.</p>")

    if is_lucas(n):
        html.append("<h2>Lucas number</h2>")
        html.append("<p>Appears in the Lucas sequence.</p>")

    if is_happy(n):
        html.append("<h2>Happy number</h2>")
        html.append("<p>Iterating sum of squares of digits reaches 1.</p>")

    if is_harshad(n):
        html.append("<h2>Harshad number</h2>")
        html.append("<p>Divisible by the sum of its digits.</p>")

    if is_repdigit(n):
        html.append("<h2>Repdigit</h2>")
        html.append("<p>All digits are identical.</p>")

    if is_semiprime(n):
        html.append("<h2>Semiprime</h2>")
        html.append("<p>Product of exactly two primes.</p>")

    eo = evil_odious_pernicious(n)
    html.append(f"<h2>{eo.capitalize()} number</h2>")
    html.append("<p>Based on parity and primality of binary 1s.</p>")

    if n in SPECIAL:
        name, desc = SPECIAL[n]
        html.append(f"<h2>{name}</h2>")
        html.append(f"<p>{desc}</p>")

    html.append("<h3>OEIS</h3>")
    html.append(f'<p><a href="https://oeis.org/search?q={n}" target="_blank">Search {n} in OEIS</a></p>')

    html.append("</div><hr>")

html.append("</body></html>")

with open("numbers.html", "w", encoding="utf-8") as f:
    f.write("\n".join(html))

print("Generated numbers.html")
