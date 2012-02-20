#### A Quick Usaged

>var model = Backbone.Model({
>  name: 'Jackey Chen',
>  mail: 'jackey@wiredcraft.com'
>});
>
>var view = bones.Com({
>  model: model,
>  schema: [
>    {class: "TextField", title: 'Your name:', attributes{name: name}    },
>    {
>      class: "TextField", title: 'Your mail:', attributes{name: mail}, email: true
>    }
>  ],
>  title: 'User Login',
>  help: 'Please provide your account to login our system.',
>});
>
>// Print somewhere.
>return view.render().el;
