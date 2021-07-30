export default ({app}) => {
  app.router.beforeEach((to,from,next)=>{
      //console.log(next.from);
      next();
  })
};
