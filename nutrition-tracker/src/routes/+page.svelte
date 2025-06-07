<script lang='ts'>

    const items = $state([
        {
            title: "yogurt",
            amount: "2 servings",
            calories: 180,
            protein: 10
        },
        {
            title: "breakfast burrito",
            amount: "1 ",
            calories: 500,
            protein: 20
        },
        {
            title: "yogurt",
            amount: "1 servings",
            calories: 140,
            protein: 6
        },
        {
            title: "milk",
            amount: "36 oz",
            calories: 675,
            protein: 36
        },
    ])

    let totals = {calories: 0, protein: 0};
    items.forEach(item => {
        totals.calories += item.calories;
        totals.protein += item.protein;
        })


</script>

<h1>Nutrition Tracker</h1>

    <div>
        totals: Calories: {totals.calories}   Protein: {totals.protein} grams 
        <button 
            class="bg-green-700 rounded-2xl px-2"
            onclick={ () => {
                console.log('clicked')
                items.push({            
                    title: "milk",
                    amount: "36 oz",
                    calories: 675,
                    protein: 36
                }) 
            }
            }
        >+</button>
    </div>


<table>
        <thead>
            <tr>
                <th>Description</th>
                <th>Calories</th>
                <th>Protein</th>
            </tr>
            {#each items as item}
            <tr>
                <td>
                    {item.title} -- {item.amount}
                </td>
                <td>
                    {item.calories}
                </td>
                <td>
                    {item.protein} grams
                </td>
            </tr>
        {/each}
        </thead>
    </table>
