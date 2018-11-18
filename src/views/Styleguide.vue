
<template lang="pug">
  .container.styleguide
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
    .buttons
      .buttons__column
        a.button Button
        a.button.button--hollow Hollow Button
      .buttons__column
        a.button.button--secondary Secondary Button
        a.button.button--secondary.button--hollow Hollow Secondary Button
      .buttons__column
        a.button.button--secondary(disabled) Disabled Button
        a.button.button--secondary.button--hollow(disabled) Hollow Disabled Button
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

<style scoped lang="scss">
  .buttons {
    display: flex;

    &__column {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      min-width: 180px;

      .button {
        margin-bottom: 20px;
        width: 100%;
      }
    }
  }
</style>
