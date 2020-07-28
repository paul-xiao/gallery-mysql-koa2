class Test {
  static async foo(ctx, next) {
    console.log(this)
  }
  static poo() {
    console.log('2')
  }
}

module.exports = Test
