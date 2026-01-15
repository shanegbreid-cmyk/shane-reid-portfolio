document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.project-filter a');
    const items = document.querySelectorAll('#portfolio-grid .portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const group = this.getAttribute('data-group');
            items.forEach(item => {
                const groups = JSON.parse(item.getAttribute('data-groups'));
                if (group === 'all' || groups.includes(group)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});