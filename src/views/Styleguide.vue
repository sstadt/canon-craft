
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
      .row
        .column.small-12.medium-6
          .form-input
            label Text Input
            input(type="text", placeholder="Text Input")
          .form-input.select
            label Select Input
            select
              option Select Menu
          .form-input
            label Textarea
            textarea(placeholder="Textarea")
          .form-input
            input(type="radio", name="foo", id="radio_1", value="foo")
            label(for="radio_1") Foo
          .form-input
            input(type="radio", name="foo", id="radio_2", value="bar")
            label(for="radio_2") Bar
          .form-input
            input(type="checkbox", id="check_1")
            label(for="check_1") Foo
          .form-input
            input(type="checkbox", id="check_2")
            label(for="check_2") Bar
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
