
<template lang="pug">
  .styleguide
    h1 Lorem Ipsum dolor sit amet consecteteur adipiscing elit
    h2 Lorem Ipsum dolor sit amet consecteteur adipiscing elit
    h3 Lorem Ipsum dolor sit amet consecteteur adipiscing elit
    h4 Lorem Ipsum dolor sit amet consecteteur adipiscing elit
    h5 Lorem Ipsum dolor sit amet consecteteur adipiscing elit
    h6 Lorem Ipsum dolor sit amet consecteteur adipiscing elit
    p Lorem Ipsum dolor sit amet consecteteur adipiscing elit
    ul
      li One item
      li Two item
      li Three item
    ol
      li One item
      li Two item
      li Three item
    dl
      dt term
      dd description
      dt term
      dd description
      dt term
      dd description
    a.button(href="#") Button
    a.button.button--alt(href="#") Button
    form
      label Text Input
        input(type="text", placeholder="Text Input")
      label Select Input
        select
          option Select Menu
      label Textarea
        textarea(placeholder="Textarea")
      label Foo
        input(type="radio", name="foo", value="foo")
      label Bar
        input(type="radio", name="foo", value="bar")
      label Foo
        input(type="checkbox")
      label Bar
        input(type="checkbox")
</template>

<script>
  export default {
    name: 'Styleguide'
  }
</script>
