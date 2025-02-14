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

  const visitorsUseSearch = monthlyVisitors * (searchUsage / 100);
  const lostConversions = visitorsUseSearch * (unsuccessfulSearchRate / 100) * (conversionRate / 100) * 2;
  const lostRevenue = lostConversions * avgOrderValue;
  const additionalPurchaseLost = lostConversions * avgAdditionalItemValue * 3;
  const totalEstimatedLostRevenue = lostRevenue + additionalPurchaseLost;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (number) => {
    return number.toLocaleString('pt-BR');
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
    switch (field) {
      case 'monthlyVisitors':
        return 'Quantos visitantes seu site tem por mês';
      case 'searchUsage':
        return 'Quantidade de usuários que fazem buscas. Padrão de mercado é 30%';
      case 'unsuccessfulSearchRate':
        return 'Porcentagem de buscas que resultam em páginas sem resultados';
      case 'avgOrderValue':
        return 'Valor médio de cada pedido';
      case 'avgAdditionalItemValue':
        return 'Valor médio de um item adicional comprado';
      default:
        return '';
    }
  };

  const monthlyTotalLoss = formatCurrency(totalEstimatedLostRevenue);
  const annualTotalLoss = formatCurrency(totalEstimatedLostRevenue * 12);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#152E2C', color: 'white' }}>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ color: '#101F22' }}>
                Calcule sua Perda de Receita
              </h2>
              <p className="text-gray-600 mb-6" style={{ color: '#101F22' }}>
                Descubra o impacto financeiro de uma busca ineficaz em seu e-commerce. Otimize sua busca e aumente
                suas vendas.
              </p>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="monthlyVisitors" className="block text-sm font-medium text-gray-700" style={{ color: '#101F22' }}>
                    Visitantes Mensais
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
                    % de Uso da Pesquisa
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
                    type="number"
                    id="searchUsage"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={searchUsage}
                    onChange={(e) => setSearchUsage(parseFloat(e.target.value))}
                    style={{ color: 'black' }}
                  />
                </div>
                <div>
                  <label htmlFor="unsuccessfulSearchRate" className="block text-sm font-medium text-gray-700" style={{ color: '#101F22' }}>
                    Taxa de Pesquisa sem Sucesso
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
                    type="number"
                    id="unsuccessfulSearchRate"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={unsuccessfulSearchRate}
                    onChange={(e) => setUnsuccessfulSearchRate(parseFloat(e.target.value))}
                    style={{ color: 'black' }}
                  />
                </div>
                <div>
                  <label htmlFor="conversionRate" className="block text-sm font-medium text-gray-700" style={{ color: '#101F22' }}>
                    Taxa de Conversão %
                  </label>
                  <input
                    type="number"
                    id="conversionRate"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                    style={{ color: 'black' }}
                  />
                </div>
                <div>
                  <label htmlFor="avgOrderValue" className="block text-sm font-medium text-gray-700" style={{ color: '#101F22' }}>
                    Ticket Médio R$
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
                    Valor de Cada Item Adicional R$
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
                  Sua Perda Total Estimada
                </h3>
                <button
                  onClick={() => setIsMonthly(!isMonthly)}
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300" style={{ backgroundColor: '#9997F4' }}>
                  {isMonthly ? 'Mensal' : 'Anual'}
                </button>
              </div>
              <p className="text-5xl font-bold text-red-600">
                {isMonthly ? monthlyTotalLoss : annualTotalLoss}
              </p>
              <p className="text-gray-600 mt-4" style={{ color: '#101F22' }}>
                Descubra como nossa IA pode otimizar sua busca e recuperar essa receita perdida.
              </p>
            </div>
          </div>
          <div className="p-8" style={{ backgroundColor: '#101F22' }}>
            <a
              href="https://retailrocket.pipedrive.com/scheduler/7pv3tO/meeting"
              className="w-full text-white py-3 rounded-md hover:bg-green-600 transition duration-300 block text-center" style={{ backgroundColor: '#9997F4' }}>
              Vamos Resolver Esse Problema?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
