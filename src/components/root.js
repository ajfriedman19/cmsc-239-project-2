import React from 'react';
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
//import ExampleChart1 from './phacking-chart';
import ExampleChart3 from './example-chart3';
import ExampleChart2 from './example-chart2';
import DonutChart from './donut_chart';
import {create_pairs} from '../utils.js';
import {aggregateByCommunityAndMonths} from '../utils.js';


const introBlock = `
In the age of big data, it is important to note that big data does not always mean better data.
When we talk about data being big, we are referring to both the number of rows in the dataset,
as well as the number of columns in the dataset. When we have lots of columns (variables) we
can make comparisons and perform hypothesis tests for a variety of different variables in the
data. When we conduct a variety of tests simultaneously, we introduce a problem known as
multiple hypothesis testing.
`;

const histogramBlock = `
To get a sense of the implications of multiple hypothesis testing, let's first consider the
scenario in which we perform only one hypothesis test. Consider taking a sample of 100
observations of data from the standard normal distribution. Then, let's test the hypothesis
that our sample does indeed come from the standard normal distribution. This seems trivial.
A sample of 100 observations is large enough that the data should approximate the distribution
it is derived of, and since we are simulating this data we can be 100% sure that it is in
fact normally distributed. The probability that our data comes from the standard normal
distribution given our observations should, therefore, be pretty big. In statistics, this
probability translates into what we call a p-value. That is, we would expect our p-values
to be pretty large. Generally speaking, small p-values cause us to reject the null hypothesis -
in this case, that our data comes from the standard normal distribution. Let's set our cutoff
for rejecting the null hypothesis at 0.1. The histogram below shows us the distribution of
these p-values if we were to perform the afforementioned test 1000 times. Mouse over the
histogram to see which p-values would cause us to reject the null hypothesis under this framework.
Red = rejection.
`;

const verticalBlock = `
Even though we are certain that our null hypothesis is true, from 1000 repetitions of this
test we actually reject the null hypothesis 10% of the time. This false positive rate is what
statisticians refer to as the Type I error rate - the rate of incorrectly rejecting a true
null hypothesis purely by chance. Although false positives are not inherently desireable, we have to allow for
a small theoretical percentage in the Type I error rate in order to give our testing framework
the power to make rejections. Finding a false positive 10% of the time doesn't seem to be
that big of a deal. This is also a relatively large threshold compared to the traditional
cutoff point of 5%. However, when we make multiple comparisons, the Type I error rate no
longer has the nice property of equality with the significance level. As the number of tests
we perform increases, so too does the Type I error rate. Take a look at the chart below to
observe the increase in the Type I error rate as a function of the number of tests performed.
Mouse over to get exact values.
`;

const explainedBlock = `
From the plot above, we can see that even if we are to perform only 10 tests, the chances of
obtaining a false positive by chance alone is over 40%! That means were are pretty likely to
find something statistically significant in our testing - even if that thing has no practical
significance. This is a huge problem in statistics and research, where often times studies
that boast statistically significant results fail to take into account the implications of
multiple hypothesis testing. This is heightened by the pressures researchers face in obtaining
p-values small enough to get published. In this case, multiple hypothesis testing can be used
to hunt through the data and perform enough tests to statistically significant results. This
phenomemon is known as p-hacking or data dredging. Basically, if you perform enough tests on
a large enough dataset, you're likely to find results good enough for publishing.
`;

const explainedBlock2 = `To get a sense for how this works, we tried it out on our own dataset`;

const pvalOneBlock = `We tried the above on our own dataset. But before we apply our statistical analysis to our dataset, let us familiarize ourselves with the data. Our raw dataset
comprises of the monthly energy usages, in the year 2010, of every single building in the Chicago area. We want to apply our p-value hypothesis testing
to several different hypotheses, that will be generated from this data. An example of hypotheses we want to test would be: (1) whether there is a 
significant relationship between community areas and building count, and (2) whether there is a significant relationship between community areas and electricity
usage, and (3) whether there is a relationship between median income, community areas, electricity usage, and building count, and (4) whether time seasonality (different
month ranges) has a bearing on any of the above factors. The treemap below gives you an overview of our data. In a very data-description sort of way, our treemap allows you to get a sense of answers to all those hypotheses.`;

const pvalTwoBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;


class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

  componentWillMount() {
  Promise.all([
    csv('data/Current_Employee_Names__Salaries__and_Position_Titles_new.csv'),
    csv('data/p-data-new.csv'),
    csv('data/energy_usage.csv'),
    csv('data/p-data.csv'),
    csv('data/chart2.csv'),
     ]).then(data => {
        this.setState({
          datavals: data[2],
          loading: false,
          chart2: data[4],
          pvals: data[1]
        });
        console.log(aggregateByCommunityAndMonths(data[1], 1, 2));
      });
  }

  render() {
    const {loading, datavals, pvals, chart2} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <div className="relative">
        <h1> So you think you can get tenure? </h1>
        <h1> An Introduction to multiple-testing and p-hacking</h1>
        <div>{introBlock}</div>
        <br/>
        <div>{histogramBlock}</div>
        <ExampleChart2 data={pvals}/>
        <div>{verticalBlock}</div>
        <ExampleChart3 data={chart2}/>
        <div>{explainedBlock}</div>
        <br />
        <div>{pvalOneBlock}</div>
        <DonutChart data={datavals}/>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
