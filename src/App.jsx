import React, { useState } from 'react';

function App() {
  const [monthlyVisitors, setMonthlyVisitors] = useState(1100000);
  const [searchUsage, setSearchUsage] = useState(30);
  const [unsuccessfulSearchRate, setUnsuccessfulSearchRate] = useState(10);
  const [conversionRate, setConversionRate] = useState(2);
  const [avgOrderValue, setAvgOrderValue] = useState(160);
  const [avgAdditionalItemValue, setAvgAdditionalItemValue] = useState(15);
  const [isMonthly, setIsMonthly] = useState(true);
  const [tooltip, setTooltip] = useState({ field: null, visible: false });
  const [isInternational, setIsInternational] = useState(false);

  const visitorsUseSearch = monthlyVisitors * (searchUsage / 100);
  const lostConversions = visitorsUseSearch * (unsuccessfulSearchRate / 100) * (conversionRate / 100) * 2;
  const lostRevenue = lostConversions * avgOrderValue;
  const additionalPurchaseLost = lostConversions * avgAdditionalItemValue * 3;
  const totalEstimatedLostRevenue = lostRevenue + additionalPurchaseLost;

  const formatCurrency = (amount, currency) => {
    const currencyFormat = isInternational ? 'en-US' : 'pt-BR';
    const currencySymbol = isInternational ? 'USD' : 'BRL';
    return new Intl.NumberFormat(currencyFormat, {
      style: 'currency',
      currency: currencySymbol,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (number) => {
    return number.toLocaleString(isInternational ? 'en-US' : 'pt-BR');
  };

  const handleMonthlyVisitorsChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numberValue = rawValue ? parseInt(rawValue, 10) : 0;
    setMonthlyVisitors(numberValue);
  };

  const handleAvgOrderValueChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numberValue = rawValue ? parseInt(rawValue, 10) : 0;
    setAvgOrderValue(numberValue);
  };

  const handleAvgAdditionalItemValueChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numberValue = rawValue ? parseInt(rawValue, 10) : 0;
    setAvgAdditionalItemValue(numberValue);
  };

  const toggleTooltip = (field) => {
    setTooltip({
      field: field,
      visible: tooltip.field === field ? !tooltip.visible : true,
    });
  };

  const getTooltipText = (field) => {
    const tooltips = {
      monthlyVisitors: isInternational ? 'How many visitors does your site have per month?' : 'Quantos visitantes seu site tem por mês',
      searchUsage: isInternational ? 'Percentage of users who search. Industry standard is 30%' : 'Quantidade de usuários que fazem buscas. Padrão de mercado é 30%',
      unsuccessfulSearchRate: isInternational ? 'Percentage of searches that result in no results pages' : 'Porcentagem de buscas que resultam em páginas sem resultados',
      conversionRate: isInternational ? 'Conversion Rate' : 'Taxa de Conversão',
      avgOrderValue: isInternational ? 'Average value of each order' : 'Valor médio de cada pedido',
      avgAdditionalItemValue: isInternational ? 'Average value of an additional item purchased' : 'Valor médio de um item adicional comprado',
    };
    return tooltips[field] || '';
  };

  const monthlyTotalLoss = formatCurrency(totalEstimatedLostRevenue, isInternational ? 'USD' : 'BRL');
  const annualTotalLoss = formatCurrency(totalEstimatedLostRevenue * 12, isInternational ? 'USD' : 'BRL');

  const labels = {
    calculateRevenueLoss: isInternational ? 'Calculate Your Revenue Loss' : 'Calcule sua Perda de Receita',
    discoverFinancialImpact: isInternational ? 'Discover the financial impact of an ineffective search on your e-commerce. Optimize your search and increase your sales.' : 'Descubra o impacto financeiro de uma busca ineficaz em seu e-commerce. Otimize sua busca e aumente suas vendas.',
    monthlyVisitors: isInternational ? 'Monthly Visitors' : 'Visitantes Mensais',
    searchUsage: isInternational ? '% Search Usage' : '% de Uso da Pesquisa',
    unsuccessfulSearchRate: isInternational ? 'Unsuccessful Search Rate' : 'Taxa de Pesquisa sem Sucesso',
    conversionRate: isInternational ? 'Conversion Rate %' : 'Taxa de Conversão %',
    avgOrderValue: isInternational ? 'Average Order Value $' : 'Ticket Médio R$',
    avgAdditionalItemValue: isInternational ? 'Value of Each Additional Item $' : 'Valor de Cada Item Adicional R$',
    estimatedTotalLoss: isInternational ? 'Estimated Total Loss' : 'Sua Perda Total Estimada',
    monthly: isInternational ? 'Monthly' : 'Mensal',
    annual: isInternational ? 'Annual' : 'Anual',
    solveThisProblem: isInternational ? 'Let\'s Solve This Problem?' : 'Vamos Resolver Esse Problema?',
    discoverHowAI: isInternational ? 'Discover how our AI can optimize your search and recover this lost revenue.' : 'Descubra como nossa IA pode otimizar sua busca e recuperar essa receita perdida.',
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#152E2C', color: 'white' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-4">
          <label className="inline-flex items-center cursor-pointer">
            <span className="mr-2" style={{ color: 'white' }}>{isInternational ? 'English' : 'Português'}</span>
            <input
              type="checkbox"
              value={isInternational}
              className="sr-only peer"
              onChange={() => setIsInternational(!isInternational)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ color: '#101F22' }}>
                {labels.calculateRevenueLoss}
              </h2>
              <p className="text-gray-600 mb-6" style={{ color: '#101F22' }}>
                {labels.discoverFinancialImpact}
              </p>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="monthlyVisitors" className="block text-sm font-medium text-gray-700" style={{ color: '#101F22' }}>
                    {labels.monthlyVisitors}
                    <span
                      onClick={() => toggleTooltip('monthlyVisitors')}
                      className="ml-1 cursor-pointer text-gray-500" style={{ color: '#101F22' }}>
                      ⓘ
                    </span>
                    {tooltip.field === 'monthlyVisitors' && tooltip.visible && (
                      <div className="mt-1 p-2 bg-gray-100 rounded-md text-sm text-gray-700">
                        {getTooltipText('monthlyVisitors')}
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    id="monthlyVisitors"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={formatNumber(monthlyVisitors)}
                    onChange={handleMonthlyVisitorsChange}
                    style={{ color: 'black' }}
                  />
                </div>
                <div>
                  <label htmlFor="searchUsage" className="block text-sm font-medium text-gray-700" style={{ color: '#101F22' }}>
                    {labels.searchUsage}
                    <span
                      onClick={() => toggleTooltip('searchUsage')}
                      className="ml-1 cursor-pointer text-gray-500" style={{ color: '#101F22' }}>
                      ⓘ
                    </span>
                    {tooltip.field === 'searchUsage' && tooltip.visible && (
                      <div className="mt-1 p-2 bg-gray-100 rounded-md text-sm text-gray-700">
                        {getTooltipText('searchUsage')}
                      </div>
                    )}
                  </label>
                  <input
                    type="range"
                    id="searchUsage"
                    className="mt-1 block w-full"
                    type="range"
                    min="0"
                    max="50"
                    value={searchUsage}
                    onChange={(e) => setSearchUsage(parseFloat(e.target.value))}
                  />
                  <span className="text-sm text-gray-500">{searchUsage}%</span>
                </div>
                <div>
                  <label htmlFor="unsuccessfulSearchRate" className="block text-sm font-medium text-gray-700" style={{ color: '#101F22' }}>
                    {labels.unsuccessfulSearchRate}
                    <span
                      onClick={() => toggleTooltip('unsuccessfulSearchRate')}
                      className="ml-1 cursor-pointer text-gray-500" style={{ color: '#101F22' }}>
                      ⓘ
                    </span>
                    {tooltip.field === 'unsuccessfulSearchRate' && tooltip.visible && (
                      <div className="mt-1 p-2 bg-gray-100 rounded-md text-sm text-gray-700">
                        {getTooltipText('unsuccessfulSearchRate')}
                      </div>
                    )}
                  </label>
                  <input
                    type="range"
                    id="unsuccessfulSearchRate"
                    className="mt-1 block w-full"
                    type="range"
                    min="0"
                    max="30"
                    value={unsuccessfulSearchRate}
                    onChange={(e) => setUnsuccessfulSearchRate(parseFloat(e.target.value))}
                  />
                  <span className="text-sm text-gray-500">{unsuccessfulSearchRate}%</span>
                </div>
                <div>
                  <label htmlFor="conversionRate" className="block text-sm font-medium text-gray-700" style={{ color: '#101F22' }}>
                    {labels.conversionRate}
                    <span
                      onClick={() => toggleTooltip('conversionRate')}
                      className="ml-1 cursor-pointer text-gray-500" style={{ color: '#101F22' }}>
                      ⓘ
                    </span>
                    {tooltip.field === 'conversionRate' && tooltip.visible && (
                      <div className="mt-1 p-2 bg-gray-100 rounded-md text-sm text-gray-700">
                        {getTooltipText('conversionRate')}
                      </div>
                    )}
                  </label>
                  <input
                    type="range"
                    id="conversionRate"
                    className="mt-1 block w-full"
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                  />
                  <span className="text-sm text-gray-500">{conversionRate}%</span>
                </div>
                <div>
                  <label htmlFor="avgOrderValue" className="block text-sm font-medium text-gray-700" style={{ color: '#101F22' }}>
                    {labels.avgOrderValue}
                    <span
                      onClick={() => toggleTooltip('avgOrderValue')}
                      className="ml-1 cursor-pointer text-gray-500" style={{ color: '#101F22' }}>
                      ⓘ
                    </span>
                    {tooltip.field === 'avgOrderValue' && tooltip.visible && (
                      <div className="mt-1 p-2 bg-gray-100 rounded-md text-sm text-gray-700">
                        {getTooltipText('avgOrderValue')}
                      </div>
                    )}
                  </label>
                  <input
                    type="number"
                    id="avgOrderValue"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={avgOrderValue}
                    onChange={handleAvgOrderValueChange}
                    style={{ color: 'black' }}
                  />
                </div>
                <div>
                  <label htmlFor="avgAdditionalItemValue" className="block text-sm font-medium text-gray-700" style={{ color: '#101F22' }}>
                    {labels.avgAdditionalItemValue}
                    <span
                      onClick={() => toggleTooltip('avgAdditionalItemValue')}
                      className="ml-1 cursor-pointer text-gray-500" style={{ color: '#101F22' }}>
                      ⓘ
                    </span>
                    {tooltip.field === 'avgAdditionalItemValue' && tooltip.visible && (
                      <div className="mt-1 p-2 bg-gray-100 rounded-md text-sm text-gray-700">
                        {getTooltipText('avgAdditionalItemValue')}
                      </div>
                    )}
                  </label>
                  <input
                    type="number"
                    id="avgAdditionalItemValue"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={avgAdditionalItemValue}
                    onChange={handleAvgAdditionalItemValueChange}
                    style={{ color: 'black' }}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center" style={{ backgroundColor: '#E0DFFE' }}>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700" style={{ color: '#101F22' }}>
                  {labels.estimatedTotalLoss}
                </h3>
                <button
                  onClick={() => setIsMonthly(!isMonthly)}
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300" style={{ backgroundColor: '#9997F4' }}>
                  {isMonthly ? labels.monthly : labels.annual}
                </button>
              </div>
              <p className="text-5xl font-bold text-red-600">
                {isMonthly ? monthlyTotalLoss : annualTotalLoss}
              </p>
              <p className="text-gray-600 mt-4" style={{ color: '#101F22' }}>
                {labels.discoverHowAI}
              </p>
            </div>
          </div>
          <div className="p-8" style={{ backgroundColor: '#101F22' }}>
            <a
              href="https://loadstone.pipedrive.com/scheduler/7pv3tO/reuniao-loadstone"
              className="w-full text-white py-3 rounded-md hover:bg-green-600 transition duration-300 block text-center" style={{ backgroundColor: '#9997F4' }}>
              {labels.solveThisProblem}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
