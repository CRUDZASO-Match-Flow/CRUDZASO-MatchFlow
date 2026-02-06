

    function openCheckout(plan, price) {
        document.getElementById("checkoutModal").classList.remove("hidden");
        document.getElementById("checkoutModal").classList.add("flex");

        document.getElementById("selectedPlan").textContent = plan + " Plan";
        document.getElementById("selectedPrice").textContent = "$" + price + "/month";
    }

    function closeCheckout() {
        document.getElementById("checkoutModal").classList.add("hidden");
        document.getElementById("checkoutModal").classList.remove("flex");
    }

    document.getElementById("checkoutForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("🎉 Your plan has been upgraded successfully!");
        closeCheckout();
    });
