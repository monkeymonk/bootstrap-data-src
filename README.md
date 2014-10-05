# Bootstrap Data Src v 1.0.0

Tiny jQuery plugin to deal with responsive image delivery using Bootstrap breakpoints.

This little script use the `Twitter Bootstrap` classes: `visible-*-block` to know what media we are delivering.


## Usage

1. Include `jQuery` and `Twitter Bootstrap` files
2. Include `Bootstrap Data Src` file
3. Do `$('.cool-img').dataSrc();` on `document` ready
4. See `example.html` to know more


## Options

    {
        inview: false,  // lazyload
        offset: 0,      // used with inview
        resize: false   // update src when resize event is fired
    }



## Todo

- [ ] refactor code
- [ ] add Data Src to Bower
- [x] add lazyload capability
