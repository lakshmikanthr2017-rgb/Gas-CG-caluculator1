document.addEventListener('DOMContentLoaded', function () {
    // Hidden internal percentage constants (from Excel)
    const rates = {
        lps: 0.315,
        hps: 0.322,
        snf: 0.083,
        milk: 0.254,
        cepmiz: 0.213
    };

    const categories = ['lps', 'hps', 'snf', 'milk', 'cepmiz'];

    function calculateAll() {
        let totalCgSum = 0;
        let totalGasSum = 0;
        let totalRestSum = 0;

        categories.forEach(cat => {
            const inputEl = document.getElementById(`${cat}-cg`);
            const inputVal = parseFloat(inputEl ? inputEl.value : 0) || 0;

            // Excel Formula: =ROUND(Value * Rate, 0)
            const gasVal = Math.round(inputVal * rates[cat]);
            // Excel Formula: =Value - GasVal
            const restVal = inputVal - gasVal;

            // Update Cards
            document.getElementById(`${cat}-gas`).textContent = `₹ ${gasVal.toLocaleString('en-IN')}`;
            document.getElementById(`${cat}-rest`).textContent = `₹ ${restVal.toLocaleString('en-IN')}`;

            // Update Table Rows
            document.getElementById(`tbl-${cat}-total`).textContent = `₹ ${inputVal.toLocaleString('en-IN')}`;
            document.getElementById(`tbl-${cat}-gas`).textContent = `₹ ${gasVal.toLocaleString('en-IN')}`;
            document.getElementById(`tbl-${cat}-rest`).textContent = `₹ ${restVal.toLocaleString('en-IN')}`;

            // Accumulate Grand Totals
            totalCgSum += inputVal;
            totalGasSum += gasVal;
            totalRestSum += restVal;
        });

        // Update Grand Totals Footer
        document.getElementById('total-cg').textContent = `₹ ${totalCgSum.toLocaleString('en-IN')}`;
        document.getElementById('total-gas').textContent = `₹ ${totalGasSum.toLocaleString('en-IN')}`;
        document.getElementById('total-rest').textContent = `₹ ${totalRestSum.toLocaleString('en-IN')}`;
    }

    // Attach immediate calculation triggers to every input field
    categories.forEach(cat => {
        const input = document.getElementById(`${cat}-cg`);
        if (input) {
            ['input', 'change', 'keyup', 'paste'].forEach(evt => {
                input.addEventListener(evt, calculateAll);
            });
        }
    });

    // Run initial calculation on page ready
    calculateAll();
});
