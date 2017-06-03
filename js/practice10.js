function Article() {
    this.created = new Date();
    Article.count++;
    Article.lastDate = this.created;
    Article.showStats = function(){
        console.log('Всего: ' + Article.count + ', Последняя: ' + Article.lastDate.getDate() + '.'
            + Article.lastDate.getMonth() + '.' + Article.lastDate.getFullYear() + ' ' + Article.lastDate.getHours()
            + ':' + Article.lastDate.getMinutes()+ ':' + Article.lastDate.getSeconds());
    }
}
Article.count = 0;

new Article();
new Article();

Article.showStats(); // Всего: 2, Последняя: (дата)

new Article();

Article.showStats(); // Всего: 3, Последняя: (дата)