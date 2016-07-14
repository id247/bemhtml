({
    block: 'page',
    title: 'Узнать больше',
    //styles: ['styles.css'],
    //scripts: ['app.js'],
    content: [ 
        {
            block: 'header',
            content: [
                {
                    block: 'logo',
                    content: {
                        block: 'link',
                        /**
                         * Условная логика
                         */
                        content: (function() {
                            var res = ['Hello '];

                            if (Math.random() > 0.5) {
                                res.push('BEM');
                            } else {
                                res.push('world');
                            }

                            return res;
                        }())
                    }
                },
                {
                    block: 'menu',
                    content: [
                        {   
                            url: 'index.html', 
                            content: 'О методологии' 
                        },
                        { 
                            url: false, 
                            content: 'Узнать больше' 
                        },
                        { 
                            url: 'http://bem.info', 
                            attrs: { 
                                target: '_blank' 
                            }, 
                            content: 'bem.info' 
                        }
                    ]
                }
            ]
        },
        {
            block: 'content',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi assumenda, neque consectetur perspiciatis est error molestiae, quis eligendi libero hic optio aperiam deserunt quod minus accusamus. Nobis tempora, neque impedit?'
        },
        {
            block: 'footer',
            content: [
                {
                    block: 'logo',
                    content: {
                        block: 'link',
                        url: 'index.html',
                        content: 'Полный БЭМ'
                    }
                }
            ]
        }
    ]
})