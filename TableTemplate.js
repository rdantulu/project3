class TableTemplate
{
    static fillIn(table_id, dictionary, col_name)
    {
        const table = document.getElementById(table_id);
        if (!table)
        {
            console.error(`Table with id "${table_id}" not found.`);
            return;
        }

        const headerRow = table.rows[0];

        for (let i = 0; i < headerRow.cells.length; i++)
        {
            const cell = headerRow.cells[i];
            cell.innerHTML = this.replaceTemplateStrings(cell.innerHTML, dictionary);
        }

        if (col_name)
        {
            const col_index = this.getcol_index(headerRow, col_name);

            if (col_index === -1)
            {
                console.error(`Column "${col_name}" not found.`);
                return;
            }

            for (let i = 1; i < table.rows.length; i++)
            {
                const cell = table.rows[i].cells[col_index];
                cell.innerHTML = this.replaceTemplateStrings(cell.innerHTML, dictionary);
            }
        }
        else
        {
            for (let i = 1; i < table.rows.length; i++)
            {
                for (let j = 0; j < table.rows[i].cells.length; j++)
                {
                    const cell = table.rows[i].cells[j];
                    cell.innerHTML = this.replaceTemplateStrings(cell.innerHTML, dictionary);
                }
            }
        }
        table.style.visibility = 'visible';
    }

    static replaceTemplateStrings(input, dictionary)
    {
        return input.replace(/\{\{(\w+)\}\}/g, (match, key) =>
            dictionary.hasOwnProperty(key) ? dictionary[key] : ''
        );
    }

    static getcol_index(headerRow, col_name)
    {
        for (let i = 0; i < headerRow.cells.length; i++)
        {
            if (headerRow.cells[i].textContent === col_name) 
            {
                return i;
            }
        }
        return -1;
    }
}
