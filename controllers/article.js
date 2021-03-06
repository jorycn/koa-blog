module.exports = function (render) {
  return {
    method: 'get',
    path: '/article/:typePath/:id', // 文章详情页
    handler: function* () {
      var
        blogInfo, articleTypes, article, comments, links, articleTags,
        params = this.params,
        typePath = params.typePath,
        id = params.id,
        typePaths = [];

      // 文章所有type
      articleTypes = yield M.articleType.find({enabled: true});
      // 循环文章所有type,来校验路由
      articleTypes.forEach(function (v) {
        typePaths.push(v.path);
      });
      // 校验路由typePath是否存在
      if (!~typePaths.indexOf(typePath)) return this.body = yield render('404', {msg: '找不到相应的文章类型'});
      // 文章内容
      article = yield M.article.findOneAndUpdate({_id: id, enabled: true}, {$inc: {visits: 1}}).populate('type tags');
      // 校验文章id是否存在
      if (!article) return this.body = yield render('404', {msg: '找不到相应的文章内容'});
      // blog信息
      blogInfo = (yield M.blogInfo.findOne()) || {};
      // 点评
      comments = yield M.comment.find({'article.id': article._id}).sort({_id: -1}).populate('user admin');
      // 友情链接
      links = yield M.link.find();
      // 标签
      articleTags = yield M.articleTag.find();
      // 模板渲染
      this.body = yield render('article', {
        articleTypes: articleTypes,
        blogInfo: blogInfo,
        article: article,
        comments: comments,
        links: links,
        articleTags: articleTags,
        commenter: this.session.admin || this.session.user || {}
      });
    }
  }
};