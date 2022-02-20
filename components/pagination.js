export default {
    props:['pages'],
    template:`
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li :class="['page-item',{disabled:!pages.has_pre}]">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="$emit('get-product', pages.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li class="page-item" :class="{ active:nowPage === pages.current_page }" v-for="nowPage in pages.total_pages"> 
                <a class="page-link" href="#" @click.prevent="$emit('get-product', nowPage)">{{ nowPage }}</a>
            </li>

            <li :class="['page-item',{disabled:!pages.has_next}]">
                <a class="page-link" href="#" aria-label="Next"
                @click.prevent="$emit('get-product', pages.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
    `
}
